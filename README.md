# Multi-Mode AI Chatbot (Ollama)

A full-stack, 100% private AI assistant built with React, Node.js, and TypeScript. This application leverages the Ollama runtime to serve advanced Large Language Models (LLMs) like Llama 3.2 directly from your local hardware, ensuring no data ever leaves your machine.

## 📸 Screenshots

Desktop Interface 
![Chat View](<img width="1908" height="888" alt="image" src="https://github.com/user-attachments/assets/3f1e4ad2-35dc-4c1c-9123-c095491bc998" />
![Icons View](<img width="560" height="169" alt="image" src="https://github.com/user-attachments/assets/d45df3fd-cf82-4f39-beaf-0f9fec5b4738" />



---

## 🚀 Features

- **Multi-Persona AI**: Change AI behavior instantly via top-level mode selection.
- **Gemini 3 Thinking**: Powered by **Gemini 3 Flash Preview** with `minimal` thinking level for near-instant responses.
- **Local LLM Support**: Fully compatible with **Ollama (Llama 3.2)** for 100% private, local execution.
- **Modern UI/UX**: Fullscreen dark-theme layout with **auto-scroll** and **Enter-to-send** support.
- **Type Safety**: End-to-end **TypeScript** implementation.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express, TypeScript
- **AI Models**: Ollama API

---

## 📦 Installation & Setup

### 1. Clone the Repository
Open your terminal and run the following command to download the project:

```bash
git clone [https://github.com/Night-E-ye/multi-mode-chatbot.git](https://github.com/Night-E-ye/multi-mode-chatbot.git)
```
## 2. Prerequisites
- Install *Ollama*.

- Download the model: ollama pull *llama3.2:1b*.

### 2. Backend Setup
```bash
cd multi-mode-chatbot
npm install
npx tsx server.ts
```
### 3. Frontend Setup
```bash

cd ../frontend
npm install
npm run dev
```
