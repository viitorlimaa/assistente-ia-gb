import dotenv from "dotenv";
dotenv.config();

// Exporta variáveis de ambiente para usar em todo o projeto
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const PORT = process.env.PORT || 3000;
