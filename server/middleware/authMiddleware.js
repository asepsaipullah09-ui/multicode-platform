const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, name: true, email: true, role: true }
      });

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden: Access denied"
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
