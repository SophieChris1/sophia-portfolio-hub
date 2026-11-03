import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import type { UIMessage } from "ai";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "./ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "./ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "./ai-elements/prompt-input";
import { Shimmer } from "./ai-elements/shimmer";
import { askSophia } from "@/lib/assistant.functions";
import { streamPortfolioAnswer } from "@/script.js";
import portrait from "@/assets/sophie.jpg";
const questions = ["Who is Sophia?", "What did Sophia study?", "What are Sophia's technical skills?", "Tell me about her research project.", "What is Sophia currently learning?"];
export function SophiaAssistant() {
  const request = useServerFn(askSophia);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"ready" | "submitted" | "streaming" | "error">("ready");
  const [error, setError] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const busy = status === "submitted" || status === "streaming";
  async function ask(question: string) {
    const text = question.trim(); if (!text || busy) return;
    const user: UIMessage = { id: crypto.randomUUID(), role: "user", parts: [{ type: "text", text }] };
    const assistant: UIMessage = { id: crypto.randomUUID(), role: "assistant", parts: [{ type: "text", text: "" }] };
    const history = [...messages, user];
    setMessages([...history, assistant]); setInput(""); setError(""); setStatus("submitted");
    textarea.current?.focus({ preventScroll: true });
    let answer = "";
    try {
      await streamPortfolioAnswer(request, history.flatMap(m => {
        const content = m.parts.filter(p => p.type === "text").map(p => p.text).join("\n");
        return content && (m.role === "user" || m.role === "assistant") ? [{ role: m.role, content }] : [];
      }), delta => {
        answer += delta; setStatus("streaming");
        setMessages(current => current.map(m => m.id === assistant.id ? { ...m, parts: [{ type: "text", text: answer }] } : m));
      });
      setStatus("ready");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Sorry, the assistant is unavailable right now.");
      setInput(text); setStatus("error"); if (!answer) setMessages(history);
    } finally { textarea.current?.focus({ preventScroll: true }); }
  }
  return <section id="ask-sophia" className="section assistant-section"><div className="container">
    <div className="section-title"><span className="eyebrow">Meet Sophia</span><h2>Ask Sophia – AI Portfolio Assistant</h2></div>
    <div className="assistant-layout"><div className="assistant-questions">
      <img src={portrait} alt="Sophia" className="assistant-portrait" width={72} height={72} />
      {questions.map(q => <Button key={q} variant="outline" className="assistant-question" disabled={busy} onClick={() => void ask(q)}>{q}</Button>)}
    </div><div className="assistant-chat">
      <Conversation className="assistant-transcript" aria-label="Conversation with Sophia's AI assistant"><ConversationContent>
        {messages.length === 0 && <ConversationEmptyState title="Hello, I'm Sophia's portfolio assistant." description="What would you like to know about Sophia?" />}
        {messages.map(m => <Message key={m.id} from={m.role}><MessageContent>{m.parts.map((part, i) => part.type === "text" && part.text ? <MessageResponse key={i}>{part.text}</MessageResponse> : null)}</MessageContent></Message>)}
        {status === "submitted" && <Shimmer>Thinking…</Shimmer>}
      </ConversationContent><ConversationScrollButton aria-label="Latest answer" /></Conversation>
      {error && <p className="assistant-error" role="alert">{error}</p>}
      <PromptInput onSubmit={({ text }) => ask(text)} className="assistant-composer">
        <PromptInputTextarea ref={textarea} value={input} onChange={e => setInput(e.target.value)} aria-label="Your question for Sophia" placeholder="Ask about Sophia…" maxLength={4000} />
        <PromptInputFooter className="assistant-footer"><PromptInputSubmit status={status} size="sm" className="assistant-submit" aria-label="Ask" disabled={busy || !input.trim()}><ArrowUp size={16} />Ask</PromptInputSubmit></PromptInputFooter>
      </PromptInput>
    </div></div>
  </div></section>;
}
