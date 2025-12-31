import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages
      });

      res.status(200).json({ reply: completion.choices[0].message.content });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
