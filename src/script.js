// Browser interaction only: no API keys, portfolio facts or model calls live here.
// The supplied server function performs the secure AI request.
export async function streamPortfolioAnswer(request, messages, onText) {
  const response = await request({ data: { messages } });
  if (!response.ok || !response.body) throw new Error("The assistant is unavailable. Please try again later.");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let completed = false;
  const consume = (line) => {
    if (!line.trim()) return;
    const event = JSON.parse(line);
    if (event.type === "delta") onText(event.text);
    if (event.type === "done") completed = true;
    if (event.type === "error") throw new Error(event.message);
  };
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      lines.forEach(consume);
      if (done) break;
    }
    consume(buffer);
    if (!completed) throw new Error("The answer was interrupted. Please try again later.");
  } finally { reader.releaseLock(); }
}
