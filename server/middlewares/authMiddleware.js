const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // The decoded token should contain { id, role }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  });
};

const trainerAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== "trainer" && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  });
};

module.exports = { auth, adminAuth, trainerAuth };
