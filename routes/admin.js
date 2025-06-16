// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  getStats,
  getAllBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

// ✅ Protected routes using your authMiddleware
router.get("/stats", authMiddleware, getStats);
router.get("/blogs", authMiddleware, getAllBlogs);
router.get("/blogs/:id", authMiddleware, getBlogById);
router.post("/blogs", authMiddleware, addBlog);
router.put("/blogs/:id", authMiddleware, updateBlog);
router.delete("/blogs/:id", authMiddleware, deleteBlog);

module.exports = router;
