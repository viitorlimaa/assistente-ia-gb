import dotenv from "dotenv";
dotenv.config();

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const PORT = process.env.PORT || 3001;

if (!GEMINI_API_KEY) {
  console.error("ERRO: A variável GEMINI_API_KEY não está definida no .env.");
  process.exit(1); // Interrompe o servidor se não houver chave
}

