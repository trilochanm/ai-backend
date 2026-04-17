export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an AI marketing assistant." },
          { role: "user", content: `Write marketing content about: ${prompt}` }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      text: data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
