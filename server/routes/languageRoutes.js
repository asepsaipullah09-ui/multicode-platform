const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
const { protect, authorize } = require("../middleware/authMiddleware");

// GET all languages (protected)
router.get("/", protect, async (req, res) => {
  try {
    const languages = await prisma.language.findMany();
    res.json(languages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST language (admin only) - using authorize middleware
router.post("/", protect, authorize("ADMIN"), async (req, res) => {
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

// GET language by ID (protected)
router.get("/:id", protect, async (req, res) => {
  try {
    const language = await prisma.language.findUnique({
      where: { id: req.params.id }
    });

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    res.json(language);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
