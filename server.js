import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { PORT, GEMINI_API_KEY } from "./env/env.js";
import chatRoutes from "./routes/chat.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// intermediários globais (middlewares)
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Rota
app.use("/api/chat", chatRoutes);

// Inicialização
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(
    `Chave Gemini: ${GEMINI_API_KEY ? "Chave encontrada" : "Não encontrada"}`
  );
});
