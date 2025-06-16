import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { createVectorStore, invokeChain } from "./utils/ragEngine.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 3000;

app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

app.post("/api/context/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File is required" });
  }
  try {
    const splitDocs = await createVectorStore(req.file.buffer);

    res.json({
      message: "PDF processed and split successfully",
      filename: req.file.originalname,
      chunks: splitDocs.length,
      preview: splitDocs[0]?.pageContent?.slice(0, 100) + "...",
    });
  } catch (error) {
    console.error("PDF parsing error:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

app.post("/api/messages/send", async (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ error: "A message is required" });
  }
  try {
    const ragResponse = await invokeChain(req.body.message);
    res.status(200).json({
      message: ragResponse,
      data: req.body,
    });
  } catch (error) {
    console.error("Error getting RAG response:", error);
    res.status(500).json({ error: "Error getting RAG response" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
