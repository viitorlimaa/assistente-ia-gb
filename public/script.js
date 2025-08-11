// Referências para elementos do DOM
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const chatForm = document.getElementById("chatForm");
const promptInput = document.getElementById("promptInput");
const submitButton = document.getElementById("submitButton");
const responseArea = document.getElementById("responseArea");
const responseContent = responseArea.querySelector(".response-content");
const submitButtonText = submitButton.querySelector(".btn-text");
const loadingSpinner = submitButton.querySelector(".loading-spinner");

// URL do backend para onde as requisições serão enviadas
const BACKEND_API_URL = "http://localhost:3000/api/chat";

// Alterna entre tema claro e escuro ao clicar no botão de tema
themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
});

// Controla o estado de loading do botão de envio
function setLoadingState(isLoading) {
  submitButton.disabled = isLoading; // Desabilita botão enquanto carrega
  submitButtonText.classList.toggle("hidden", isLoading); // Oculta texto do botão
  loadingSpinner.classList.toggle("hidden", !isLoading); // Mostra spinner de loading
}

// Exibe mensagem na área de resposta, pode ser erro (isError=true)
function displayMessage(message, isError = false) {
  responseArea.classList.remove("hidden"); // Torna a área visível
  responseContent.textContent = message; // Insere o texto da mensagem
  responseContent.classList.toggle("error-message", isError); // Aplica estilo de erro se necessário
  responseArea.scrollIntoView({ behavior: "smooth", block: "end" }); // Scroll para resposta
}

// Valida se o prompt (pergunta) não está vazio
function validateInput(prompt) {
  if (!prompt) {
    displayMessage("Erro: Por favor, digite sua pergunta.", true);
    return false;
  }
  return true;
}

// Envia a requisição POST para o backend com o prompt
async function sendRequest(prompt) {
  console.log("Enviando requisição para o backend com prompt:", prompt);
  setLoadingState(true); // Ativa estado de loading
  try {
    const response = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Define JSON no corpo
      body: JSON.stringify({ prompt }), // Envia o prompt em JSON
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Erro do servidor: ${response.status}`
      );
    }

    const data = await response.json();
    displayMessage(data.response); // Mostra a resposta da IA
  } catch (error) {
    displayMessage(`Ocorreu um erro: ${error.message}`, true); // Mostra erro
  } finally {
    setLoadingState(false); // Desativa estado de loading
  }
}

// Captura o evento de submit do formulário
chatForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita recarregar a página
  console.log("Evento submit disparado");
  const prompt = promptInput.value.trim(); // Remove espaços

  if (validateInput(prompt)) {
    console.log("Prompt válido:", prompt);
    sendRequest(prompt); // Envia a requisição para o backend
  }
});

// Permite enviar a pergunta com Ctrl + Enter no textarea
promptInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.ctrlKey) {
    event.preventDefault();
    chatForm.dispatchEvent(new Event("submit")); // Dispara o submit do formulário
  }
});
