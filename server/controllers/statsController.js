const prisma = require("../prisma");

exports.getStats = async (req, res) => {
  try {
    const totalLanguages = await prisma.language.count();
    const totalUsers = await prisma.user.count();

    res.json({
      totalLanguages,
      totalUsers
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};
