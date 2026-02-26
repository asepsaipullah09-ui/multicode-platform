const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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

async function main() {
  console.log("Seeding database...");
  
  try {
    // Clear existing data (ignore if tables don't exist)
    await prisma.language.deleteMany().catch(() => {});
    await prisma.user.deleteMany().catch(() => {});
    console.log("Cleared existing data");
    
    // Insert new data
    for (const lang of languages) {
      await prisma.language.create({
        data: lang
      });
    }
    
    console.log(`Seeded ${languages.length} languages`);
  } catch (e) {
    console.log("Could not seed languages:", e.message);
  }
  
  // Create test user
  const hashedPassword = await bcrypt.hash("123456", 10);
  
  await prisma.user.create({
    data: {
      name: "Asep",
      email: "asep@email.com",
      password: hashedPassword,
      role: "ADMIN"
    }
  });
  
  console.log("User created!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Done!");
  });
