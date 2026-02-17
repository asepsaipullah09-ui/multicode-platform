const express = require("express");
const router = express.Router();
const Language = require("../models/Language");

// GET all languages
router.get("/", async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST language (sementara bebas dulu)
router.post("/", async (req, res) => {
  try {
    const language = new Language({
      name: req.body.name,
      description: req.body.description,
    });

    const saved = await language.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
