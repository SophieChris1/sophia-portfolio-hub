import { createServerFn } from "@tanstack/react-start";
import { streamResponse, GatewayError } from "@lovable.dev/ai-gateway";
import { assistantInput, assistantInstructions } from "./portfolio-assistant";
export const askSophia = createServerFn({ method: "POST" }).inputValidator(input => assistantInput.parse(input)).handler(async ({ data }) => {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({ async start(controller) {
    const send = (event: object) => controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
    try {
      const stream = await streamResponse({ model: "openai/gpt-6-astra", instructions: assistantInstructions(), input: data.messages.map(m => ({ role: m.role, content: m.content })), max_output_tokens: 2500, reasoning: { effort: "low" } });
      let completed = false;
      for await (const event of stream) {
        if (event.type === "response.output_text.delta" || event.type === "response.refusal.delta") send({ type: "delta", text: event.delta });
        if (event.type === "response.completed") completed = true;
        if (event.type === "response.incomplete") throw new Error("Incomplete assistant response");
      }
      if (!completed) throw new Error("Assistant response did not complete");
      send({ type: "done" });
    } catch (error) {
      if (error instanceof GatewayError) console.error("Portfolio AI failure", { code: error.code, status: error.httpStatus, outcome: error.outcome, recovery: error.recovery, remote: error.remote, ids: error.ids });
      else console.error("Portfolio assistant failure", error);
      const message = error instanceof GatewayError && error.code === "payment_required" ? "The assistant is temporarily unavailable because its AI credits need replenishing. Please contact Sophia directly." : "Sorry, I couldn't finish that answer. Your question is still here; please try again later or contact Sophia directly.";
      send({ type: "error", message });
    } finally { controller.close(); }
  }});
  return new Response(body, { headers: { "Content-Type": "application/x-ndjson", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
});
