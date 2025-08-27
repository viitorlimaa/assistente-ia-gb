import fetch from "node-fetch";
import { GEMINI_API_KEY } from "../env/env.js";

/**
 *
 * @param {string} prompt
 * @returns
 */

export async function getGeminiResponse(prompt) {
  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || "Erro desconhecido na API Gemini."
    );
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Resposta vazia.";
}
