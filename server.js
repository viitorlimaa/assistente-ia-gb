import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log("Chave carregada:", GEMINI_API_KEY);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  console.log("Requisição recebida no /api/chat");
  console.log("Body recebido:", req.body);

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

    console.log("Enviando para Gemini:", body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro da API Gemini:", errorData);
      return res.status(500).json({
        message: errorData.error?.message || "Erro na API Gemini.",
        details: errorData,
      });
    }

    const data = await response.json();
    console.log("Resposta da Gemini:", data);

    const aiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "Resposta vazia.";
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Erro no backend:", error);
    res.status(500).json({
      message: "Erro no servidor.",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
