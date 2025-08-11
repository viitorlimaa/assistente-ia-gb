# Assistente de IA

## Descrição

Este projeto é um **assistente de IA web** que utiliza front-end em HTML, CSS e JavaScript puros, e backend em Node.js com Express. A aplicação permite ao usuário:

- Fazer perguntas e receber respostas da IA via Google Gemini API.
- Visualizar respostas em uma interface moderna, responsiva e intuitiva.
- Alternar entre modo real (API Gemini) e modo simulado (respostas mockadas) para facilitar o desenvolvimento.
- Persistir dados localmente no navegador usando `localStorage`.
- Ver estados de carregamento e tratamento de erros claros na interface.

---

## Funcionalidades

- Backend modular, organizado em arquivos (`server.js`, `app.js`, `routes/chat.js`, `services/gemini-service.js`, `server-config.js`).
- Configuração via arquivo `.env` para chave da API, porta do servidor e modo de teste.
- Logs detalhados no backend para facilitar debug.
- Suporte a CORS para permitir chamadas do frontend.
- Frontend simples com validação, feedback visual e modo escuro/claro.
- Envio de perguntas ao backend via fetch e exibição da resposta da IA.

---

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/viitorlimaa/assistente-ia-gb.git
cd assistente-ia-gb

```
