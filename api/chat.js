const SYSTEM_PROMPT = `You are AgriGuide's friendly farming assistant. Format your responses clearly using:
- **Bold** for important terms
- Bullet points (• or -) for lists
- Short paragraphs (2–3 lines max)
- Clean structure: no long walls of text

Help users with: crop selection, soil, fertilizers (N, P, K), climate, and how to use this app. Keep answers concise and practical. Use simple language.`;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Chatbot is not configured. Add REACT_APP_GEMINI_API_KEY in Vercel Settings > Environment Variables." });
  }

  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      throw new Error(data?.error?.message || "Gemini API request failed");
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response. Please try again.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat API error:", err.message);
    return res.status(500).json({ error: err.message || "Something went wrong. Please try again." });
  }
}
