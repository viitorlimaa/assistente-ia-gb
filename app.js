import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import chatRoutes from "./routes/chat.js";

const app = express();

// Para obter caminho da pasta atual (__dirname equivalente em ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares globais

// Log simples de todas as requisições recebidas
app.use((req, res, next) => {
  console.log(`Requisição: ${req.method} ${req.url}`);
  next();
});

app.use(cors()); // Habilita CORS para chamadas cross-origin
app.use(bodyParser.json()); // Permite interpretar JSON no corpo da requisição

// Servir arquivos estáticos da pasta 'public' (frontend)
app.use(express.static(path.join(__dirname, "public")));

// Configura rota /api/chat para usar router do chat
app.use("/api/chat", chatRoutes);

export default app;
