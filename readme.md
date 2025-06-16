# langchain-gpt-chatbot

A simple RAG (Retrieval-Augmented Generation) chatbot that allows users to upload PDF documents as context for AI-powered conversations using Langchain, Groq AI, and Ollama.

## Features

- Upload PDF documents to provide context for conversations
- RAG implementation using Langchain
- Simple React frontend with Vite
- Node.js backend with REST API

## Project Structure

```
langchain-gpt-chatbot/
├── frontend/          # React.js + Vite frontend
├── backend/           # Node.js backend with Langchain
├── FakeCorp.pdf       # Sample FAQ document
└── GloboNest.pdf      # Sample FAQ document
```

## Setup

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   GROQ_API_KEY=(your Groq API key))
   PORT=4000
   OLLAMA_PORT=11434
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with:

   ```
   VITE_API_BACKEND_API_URL=http://localhost:4000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Start both backend and frontend servers
2. Open your browser and navigate to the frontend URL
3. Upload a PDF document to provide context - you can use the 2 provided sample PDFs
4. Start chatting with the AI using the uploaded document as reference

## Sample Documents

Two sample FAQ PDFs are included:

- `FakeCorp.pdf` - Sample corporate FAQ
- `GloboNest.pdf` - Sample company FAQ

## Requirements

- Node.js
- Ollama installed and running
- Valid Groq API key
