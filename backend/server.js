// server.js
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config(); // Load variables from backend/.env

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// ✅ Auth routes
app.use("/api/auth", authRoutes);


// ✅ MongoDB connection (non‑SRV fallback)

mongoose.connect(
  process.env.MONGO_URI,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  }
)
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});



// ✅ Schema for images
const ImageSchema = new mongoose.Schema({
  filename: String,
  prediction: String,
  confidence: Number,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});
const ImageModel = mongoose.model("Image", ImageSchema);

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Upload route
app.post("/upload", upload.single("image"), async (req, res) => {
  const { prediction, confidence } = req.body;

  const result = {
    filename: req.file.originalname,
    prediction,
    confidence,
    imageUrl: `/uploads/${req.file.filename}`,
    createdAt: new Date(),
  };

  if (mongoose.connection.readyState === 1) {
    await ImageModel.create(result);
  } else {
    fallbackHistory.unshift(result);
  }

  res.json(result);
});

// ✅ History route
app.get("/history", async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const history = await ImageModel.find().sort({ createdAt: -1 });
    return res.json(history);
  }

  const history = fallbackHistory.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(history);
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
