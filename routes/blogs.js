const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addComment,
  deleteComment,
} = require("../controllers/blogControllers");

const router = express.Router();

// 📖 Public Routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

router.post("/", auth, createBlog);
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);

// ❤️ Like a blog post
router.post("/:id/like", auth, likeBlog);

// 💬 Comment routes
router.post("/:id/comments", auth, addComment);
router.delete("/:id/comments/:commentId", auth, deleteComment);

module.exports = router;
