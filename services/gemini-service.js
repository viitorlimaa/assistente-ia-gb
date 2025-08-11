import fetch from "node-fetch";
import { GEMINI_API_KEY } from "../server-config.js";

/**
 * Função para enviar o prompt para a API Gemini e receber a resposta.
 * @param {string} prompt - Texto enviado para a IA.
 * @returns {Promise<string>} - Texto gerado pela IA.
 * @throws {Error} - Caso a chave não esteja configurada ou ocorra erro na requisição.
 */
export async function generateContentFromGemini(prompt) {
  // Verifica se a chave da API está configurada
  if (!GEMINI_API_KEY) {
    throw new Error("Chave da API Gemini não configurada.");
  }

  // Monta o corpo da requisição conforme a API Gemini espera
  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  // Realiza a chamada POST para a API Gemini usando fetch
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tipo do conteúdo JSON
      },
      body: JSON.stringify(body), // Converte o corpo para JSON
    }
  );

  // Se a resposta não for OK (status 200), lança um erro com detalhes
  if (!response.ok) {
    const errorData = await response.json(); // Extrai o JSON com detalhes do erro
    const message =
      errorData.error?.message || "Erro desconhecido na API Gemini.";
    const error = new Error(message);
    error.details = errorData; // Adiciona detalhes do erro para debug
    error.statusCode = response.status; // Código HTTP da resposta
    throw error; // Lança o erro para ser tratado na rota
  }

  // Converte a resposta para JSON para extrair o texto gerado
  const data = await response.json();

  // Retorna o texto gerado pela IA ou uma mensagem padrão caso vazio
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Resposta vazia.";
}
