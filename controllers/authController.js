const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = (req, res) => {
  const { email, password } = req.body;

  // Validate email
  if (email.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase()) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare plain password
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Wrong password" });
  }

  // Generate JWT token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
};

module.exports = { login };
