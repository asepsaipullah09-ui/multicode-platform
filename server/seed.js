const mongoose = require("mongoose");
const Language = require("./models/Language");
require("dotenv").config();

const languages = [
  { name: "Python", description: "A high-level programming language known for its readability and versatility." },
  { name: "C++", description: "A powerful general-purpose programming language that supports object-oriented programming." },
  { name: "JavaScript", description: "A versatile programming language primarily used for web development." },
  { name: "Java", description: "A robust, object-oriented programming language designed to be platform-independent." },
  { name: "C#", description: "A modern, object-oriented programming language developed by Microsoft." },
  { name: "Ruby", description: "A dynamic, reflective programming language known for its simplicity and productivity." },
  { name: "Go", description: "A statically typed programming language developed by Google, known for its concurrency support." },
  { name: "Rust", description: "A systems programming language that focuses on safety and performance." },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    
    // Clear existing data
    await Language.deleteMany({});
    console.log("Cleared existing languages");
    
    // Insert new data
    const result = await Language.insertMany(languages);
    console.log(`Seeded ${result.length} languages`);
    
    mongoose.disconnect();
    console.log("Done!");
  })
  .catch(err => console.log(err));
