const express = require('express');
const router = express.Router();
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.CO_API_KEY,
});

router.post('/summarize', async (req, res) => {
  const { tasks } = req.body;

  if (!tasks || !Array.isArray(tasks)) {
    return res.status(400).json({ message: 'Tasks array is required' });
  }

  const taskText = tasks.map(t => `${t.title}: ${t.description}`).join('\n');

  try {
    const chatRes = await cohere.chat({
      message: `Summarize these tasks:\n${taskText}`,
      temperature: 0.3,
    });

    const summary = chatRes.text;
    res.json({ summary });

  } catch (error) {
    console.error("Cohere Chat API Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "AI summarization failed",
      error: error.message,
    });
  }
});

module.exports = router;