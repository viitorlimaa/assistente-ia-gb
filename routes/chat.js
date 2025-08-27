import express from "express";
import { getGeminiResponse } from "../services/gemini-service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Requisição recebida:", req.body);

  try {
    const { prompt } = req.body;
    if (typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        message:
          'O campo "prompt" é obrigatório e deve ser uma string não vazia.',
      });
    }

    const aiResponse = await getGeminiResponse(prompt);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error(" Erro na rota /api/chat:", error.message);
    res.status(500).json({
      message: "Erro ao processar requisição.",
      error: error.message,
    });
  }
});

export default router;
