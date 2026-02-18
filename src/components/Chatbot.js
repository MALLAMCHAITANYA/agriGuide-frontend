import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

function FormattedText({ text }) {
  const parts = [];
  const lines = text.split("\n");
  let listItems = [];
  const flushList = () => {
    if (listItems.length) {
      parts.push(<ul key={parts.length} className="chat-list">{listItems}</ul>);
      listItems = [];
    }
  };
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (/^[-•*]/.test(trimmed)) {
      const content = trimmed.replace(/^[-•*]\s*/, "");
      listItems.push(<li key={listItems.length}>{formatBold(content)}</li>);
    } else if (trimmed) {
      flushList();
      parts.push(<p key={parts.length} className="chat-paragraph">{formatBold(line)}</p>);
    } else {
      flushList();
      parts.push(<br key={parts.length} />);
    }
  });
  flushList();
  return <div className="chat-formatted">{parts}</div>;
}

function formatBold(str) {
  const re = /\*\*(.+?)\*\*/g;
  const result = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = re.exec(str)) !== null) {
    result.push(str.slice(lastIndex, match.index));
    result.push(<strong key={key++}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }
  result.push(str.slice(lastIndex));
  return result;
}

const SYSTEM_PROMPT = `You are AgriGuide's friendly farming assistant. Format your responses clearly using:
- **Bold** for important terms
- Bullet points (• or -) for lists
- Short paragraphs (2–3 lines max)
- Clean structure: no long walls of text

Help users with: crop selection, soil, fertilizers (N, P, K), climate, and how to use this app. Keep answers concise and practical. Use simple language.`;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm AgriGuide's assistant. Ask me anything about crops, soil, fertilizers, or how to use this app.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const useApiRoute = !apiKey;

    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      let reply;
      if (useApiRoute) {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || data?.message || "API request failed");
        }
        reply = data.reply || "Sorry, I couldn't generate a response. Please try again.";
      } else {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
              contents: [{ parts: [{ text: trimmed }] }],
            }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error?.message || "API request failed");
        }
        reply =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn't generate a response. Please try again.";
      }
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      const msg =
        err.message?.includes("API key") || err.message?.includes("not configured")
          ? err.message
          : err.message || "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `❌ ${msg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-wrapper">
      <div
        className={`chatbot-window ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-label="AgriGuide chat"
      >
        <div className="chatbot-header">
          <span className="chatbot-header-icon">🌾</span>
          <span className="chatbot-header-title">AgriGuide Assistant</span>
          <button
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-message ${m.role}`}>
              <span className="chat-bubble">
                {m.role === "assistant" ? (
                  <FormattedText text={m.text} />
                ) : (
                  m.text
                )}
              </span>
            </div>
          ))}
          {loading && (
            <div className="chat-message assistant">
              <span className="chat-bubble typing">...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about crops, soil, or this app..."
            disabled={loading}
            className="chatbot-input"
            aria-label="Type your message"
          />
          <button
            className="chatbot-send"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>

      <button
        className={`chatbot-bubble ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        <span className="chatbot-bubble-icon">💬</span>
      </button>
    </div>
  );
}

export default Chatbot;
