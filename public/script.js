const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const chatForm = document.getElementById("chatForm");
const promptInput = document.getElementById("promptInput");
const submitButton = document.getElementById("submitButton");
const responseArea = document.getElementById("responseArea");
const responseContent = responseArea.querySelector(".response-content");
const submitButtonText = submitButton.querySelector(".btn-text");
const loadingSpinner = submitButton.querySelector(".loading-spinner");

const BACKEND_API_URL = "http://localhost:3000/api/chat"; // URL do backend

// Alternar tema claro/escuro
themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
});

function setLoadingState(isLoading) {
  submitButton.disabled = isLoading;
  submitButtonText.classList.toggle("hidden", isLoading);
  loadingSpinner.classList.toggle("hidden", !isLoading);
}

function displayMessage(message, isError = false) {
  responseArea.classList.remove("hidden");
  responseContent.textContent = message;
  responseContent.classList.toggle("error-message", isError);
  responseArea.scrollIntoView({ behavior: "smooth", block: "end" });
}

function validateInput(prompt) {
  if (!prompt) {
    displayMessage("Erro: Por favor, digite sua pergunta.", true);
    return false;
  }
  return true;
}

async function sendRequest(prompt) {
  setLoadingState(true);
  try {
    const response = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Erro do servidor: ${response.status}`
      );
    }

    const data = await response.json();
    displayMessage(data.response);
  } catch (error) {
    displayMessage(`Ocorreu um erro: ${error.message}`, true);
  } finally {
    setLoadingState(false);
  }
}

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
