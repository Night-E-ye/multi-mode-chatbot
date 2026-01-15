import express from 'express';
import cors from 'cors';
import ollama from 'ollama'; // Import local Ollama client

const app = express();
app.use(cors());
app.use(express.json());

const modes: Record<string, string> = {
  lawyer: "You are a senior lawyer. Be formal and very concise. Use 3 sentences max.",
  doctor: "You are a professional doctor. Be empathetic but brief. Include disclaimers.",
  coach: "You are a high-energy coach. Use short, punchy motivational sentences.",
  teacher: "You are a patient teacher. Explain simply and briefly. Use 1 analogy.",
  director: "You are a movie director. Be dramatic but short. Use script formatting."
};

app.post('/chat', async (req, res) => {
  const { message, mode } = req.body;
  const systemPrompt = modes[mode] || "You are a helpful assistant.";

  try {
    // Talk to your local machine instead of Google's servers
    const response = await ollama.chat({
      model: 'llama3.2:1b', 
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      stream: false, // Set to true if you want a typewriter effect
    });

    res.json({ reply: response.message.content });
  } catch (error: any) {
    console.error("Local LLM Error:", error);
    res.status(500).json({ error: "Ollama is not running. Start it with 'ollama serve'." });
  }
});

app.listen(5000, () => console.log("Local Llama Server on port 5000"));