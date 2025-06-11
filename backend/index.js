import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

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
const OPENAI_KEY = process.env.OPENAI_API_KEY;

app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/context/upload", (req, res) => {
  const { context } = req.body;
  if (!context) {
    return res.status(400).json({ error: "Context is required" });
  }
  console.log("Context received:", context);
  res.json({ message: "Context set", context });
});

app.post("/a", upload.single("file"), (req, res) => {
  console.log("Upload endpoint called");

  if (!req.file) {
    return res.status(400).json({ error: "File is required" });
  }

  try {
    const fileContent = req.file.buffer.toString("utf8");
    console.log("File received:", req.file.originalname);
    console.log("File size:", req.file.size);

    res.json({
      message: "File uploaded successfully",
      filename: req.file.originalname,
      size: req.file.size,
      context: fileContent.substring(0, 100) + "...",
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Error processing file" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
