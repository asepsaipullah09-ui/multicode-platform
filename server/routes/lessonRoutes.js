const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// GET lesson berdasarkan language
router.get("/language/:languageId", async (req, res) => {
  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        languageId: req.params.languageId,
      },
    });

    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST lesson
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const lesson = await prisma.lesson.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        languageId: req.body.language,
        userId: req.user.id,
      },
    });

    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET single lesson by ID
router.get("/:id", async (req, res) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
    });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
