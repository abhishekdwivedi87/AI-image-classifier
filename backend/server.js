import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect("mongodb+srv://abhishekdwivediofficial65_db_user:SjBgpM7PJCgbcPUm@cluster0.xwizykt.mongodb.net/?appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Schema for images
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
  };

  await ImageModel.create(result);
  res.json(result);
});

// ✅ History route
app.get("/history", async (req, res) => {
  const history = await ImageModel.find().sort({ createdAt: -1 });
  res.json(history);
});

app.listen(5000, () => console.log("Server running on port 5000"));
