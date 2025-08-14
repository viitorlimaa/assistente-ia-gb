// =====================
// Referências de elementos
// =====================
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const chatForm = document.getElementById("chatForm");
const promptInput = document.getElementById("promptInput");
const submitButton = document.getElementById("submitButton");
const responseArea = document.getElementById("responseArea");
const responseContent = responseArea.querySelector(".response-content");
const submitButtonText = submitButton.querySelector(".btn-text");
const loadingSpinner = submitButton.querySelector(".loading-spinner");

const BACKEND_API_URL =
  window.location.protocol === "file:"
    ? "http://localhost:3000/api/chat"
    : "/api/chat";

// =====================
// Alternar tema claro/escuro
// =====================
themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
});

// =====================
// Estado de loading no botão
// =====================
function setLoadingState(isLoading) {
  submitButton.disabled = isLoading;
  submitButtonText.classList.toggle("hidden", isLoading);
  loadingSpinner.classList.toggle("hidden", !isLoading);
}

// =====================
// Exibir mensagens na UI
// =====================
function displayMessage(message, isError = false) {
  responseArea.classList.remove("hidden");
  responseContent.textContent = message;
  responseContent.classList.toggle("error-message", isError);
  responseArea.scrollIntoView({ behavior: "smooth", block: "end" });
}

// =====================
// Validação do input
// =====================
function validateInput(prompt) {
  if (!prompt) {
    displayMessage("Por favor, digite sua pergunta.", true);
    return false;
  }
  return true;
}

// =====================
// Enviar requisição ao backend
// - Mensagem genérica em caso de erro (boas práticas de UX/segurança)
// - Logs detalhados ficam no console para dev
// =====================
async function sendRequest(prompt) {
  setLoadingState(true);
  try {
    const response = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Erro detalhado do servidor:", errorData);
      throw new Error("Não foi possível processar sua solicitação.");
    }

    const data = await response.json();
    displayMessage(data.response || "Resposta recebida (vazia).");
  } catch (error) {
    displayMessage(
      "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.",
      true
    );
    console.error("Erro capturado:", error);
  } finally {
    setLoadingState(false);
  }
}

// =====================
// Eventos de envio
// =====================
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const prompt = promptInput.value.trim();
  if (validateInput(prompt)) {
    sendRequest(prompt);
  }
});

// Enviar com Ctrl+Enter
promptInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.ctrlKey) {
    event.preventDefault();
    chatForm.dispatchEvent(new Event("submit"));
  }
});
