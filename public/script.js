// Elementos do DOM
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const toggleThemeBtn = document.getElementById("toggle-theme");
const clearChatBtn = document.getElementById("clear-chat");
const charCount = document.getElementById("char-count");

// Contador interno de caracteres
const MAX_CHARS = 200;
userInput.addEventListener("input", () => {
  if (userInput.value.length > MAX_CHARS)
    userInput.value = userInput.value.substring(0, MAX_CHARS);
  charCount.innerText = `${userInput.value.length}/${MAX_CHARS}`;
});

// Tema Dark/Light
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}
toggleThemeBtn.addEventListener("click", toggleTheme);
document.documentElement.setAttribute(
  "data-theme",
  localStorage.getItem("theme") || "dark"
);

// Adiciona mensagens ao chat
function addMessage(text, sender = "bot", isError = false) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  if (isError) msg.classList.add("error");
  msg.innerText = text;

  if (sender === "bot" && !isError) {
    const copyBtn = document.createElement("button");
    copyBtn.classList.add("copy-btn");
    copyBtn.title = "Copiar resposta";

    const icon = document.createElement("span");
    icon.classList.add("material-icons");
    icon.innerText = "content_copy";
    copyBtn.appendChild(icon);

    copyBtn.addEventListener("click", () => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          const toast = document.createElement("div");
          toast.classList.add("copied-toast");
          toast.innerText = "Texto copiado";
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 2000);
        })
        .catch(() => alert("Não foi possível copiar o texto"));
    });

    msg.appendChild(copyBtn);
  }

  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Animação do header ao enviar mensagem
function shrinkHeader() {
  const header = document.querySelector(".app-header");
  header.classList.add("header-small");
}

// Enviar mensagem
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  shrinkHeader();
  addMessage(message, "user");

  userInput.value = "";
  charCount.innerText = `0/${MAX_CHARS}`;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: message }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error();

    addMessage(data.response, "bot");
  } catch (err) {
    addMessage("Não foi possível processar sua solicitação.", "bot", true);
  }
}

// Eventos de envio
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Limpar toda a conversa com confirm
if (clearChatBtn) {
  clearChatBtn.addEventListener("click", () => {
    const confirmDelete = confirm(
      "Tem certeza que deseja excluir toda a conversa?"
    );
    if (confirmDelete) {
      chatContainer.innerHTML = "";
      userInput.value = "";
      charCount.innerText = `0/${MAX_CHARS}`;
    }
  });
}

// Executa a animação dos elementos ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  const elements = [
    document.querySelector(".app-header"),
    document.querySelector(".search-box"),
    document.querySelector("#chat-container"),
  ];

  elements.forEach((el, index) => {
    if (el) {
      el.classList.add("fade-in", `fade-delay-${index + 1}`);
    }
  });
});
