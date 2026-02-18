const express = require("express");
const router = express.Router();
const Lesson = require("../models/Lesson");

// ✅ GET lesson berdasarkan language
router.get("/language/:languageId", async (req, res) => {
  try {
    const lessons = await Lesson.find({
      language: req.params.languageId,
    });

    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST lesson
router.post("/", async (req, res) => {
  try {
    const lesson = new Lesson({
      title: req.body.title,
      content: req.body.content,
      language: req.body.language,
    });

    const saved = await lesson.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ GET single lesson by ID
router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
