# Assistente de IA

## Descrição

Este projeto é um **assistente de IA web** construído com HTML, CSS e JavaScript puros. Ele permite ao usuário:

- Fazer perguntas e receber respostas diretamente da IA
- Visualizar respostas com interface moderna, responsiva e otimizada

O objetivo é aprender a integrar APIs de IA, tratar estados de interface (loading/erro), persistir dados com `localStorage` e proporcionar uma boa experiência de usuário. Esta estrutura é ideal para iniciantes em tecnologias web e integração com OpenAI/Gemini.

## Funcionalidades

- Layout limpo e responsivo
- Campo para API Key e seleção de modelo (OpenAI/Gemini)
- Input de texto para perguntas
- Botão de envio com estado “loading”
- Área para exibição de respostas e tratamento de erros
- Validação de formulário e feedback visual

## 🛠️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/assistente-ia.git
   cd assistente-ia
   ```

## ▶️ Como Rodar o Projeto

### 1. Instale as dependências do backend

> O backend é feito com Node.js e Express, e utiliza a API Gemini.

```bash
npm install
```

### 2. Configure a chave da API

Crie um arquivo chamado `.env` na raiz do projeto e adicione sua chave da Gemini:

```
GEMINI_API_KEY=sua-chave-aqui
```

> 🔒 O arquivo `.env` já está no `.gitignore` para manter sua chave protegida.

### 3. Inicie o servidor

```bash
node server.js
```

Você verá no terminal:

```
Servidor rodando em http://localhost:3000
```

### 4. Acesse no navegador

Abra no navegador:

```
http://localhost:3000
```

A interface web será carregada e você poderá:
- Inserir perguntas
- Enviar para a IA
- Visualizar respostas formatadas
- Clique no link `http://localhost:3000` que vai encaminhá-lo para a página do projeto no navegador