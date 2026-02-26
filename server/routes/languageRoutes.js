const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// GET all languages (protected)
router.get("/", protect, async (req, res) => {
  try {
    const languages = await prisma.language.findMany();
    res.json(languages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST language (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const language = await prisma.language.create({
      data: {
        name: req.body.name,
        description: req.body.description,
      }
    });

    res.status(201).json(language);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
