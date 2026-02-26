const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const languageRoutes = require("./routes/languageRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/stats", statsRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
