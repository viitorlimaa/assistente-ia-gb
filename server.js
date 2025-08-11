import app from "./app.js";
import { PORT, GEMINI_API_KEY } from "./server-config.js";

console.log(`Servidor iniciando na porta ${PORT}...`);
console.log(`Chave Gemini carregada: ${GEMINI_API_KEY ? "Sim" : "Não"}`);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
