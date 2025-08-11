import express from "express";
import fetch from "node-fetch";
import { GEMINI_API_KEY } from "../server-config.js";

const router = express.Router();

// Rota POST /api/chat para receber prompt e retornar resposta da Gemini API
router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Campo "prompt" é obrigatório.' });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ message: "Chave da API não configurada." });
  }

  try {
    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    console.log("Enviando para Gemini:", prompt);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro Gemini:", errorData);
      return res.status(500).json({
        message: errorData.error?.message || "Erro na API Gemini.",
        details: errorData,
      });
    }

    const data = await response.json();

    const aiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "Resposta vazia.";

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Erro no backend:", error);
    res
      .status(500)
      .json({ message: "Erro no servidor.", error: error.message });
  }
});

export default router;
