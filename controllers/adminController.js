// controllers/adminController.js
const Blog = require("../models/Blog");
const User = require("../models/admin");

// 📊 GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const totalUsers = await User.countDocuments();

    // Top 5 blogs by likes
    const topBlogs = await Blog.find({})
      .sort({ likes: -1 })
      .limit(5)
      .select("_id title likes");

    // Most commented blog
    const blogs = await Blog.find().select("title comments");
    let mostCommentedBlog = { title: "N/A", commentCount: 0 };
    for (let blog of blogs) {
      if (blog.comments?.length > mostCommentedBlog.commentCount) {
        mostCommentedBlog = {
          title: blog.title,
          commentCount: blog.comments.length,
          _id: blog._id,
        };
      }
    }

    // Latest 5 comments across all blogs
    const latestComments = [];
    for (const blog of blogs) {
      for (const comment of blog.comments || []) {
        latestComments.push({
          blogId: blog._id,
          blogTitle: blog.title,
          ...comment,
        });
      }
    }

    // Sort latestComments by date and limit to 5
    latestComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const latestFiveComments = latestComments.slice(0, 5);

    res.json({
      totalBlogs,
      totalUsers,
      topBlogs,
      mostCommentedBlog,
      latestComments: latestFiveComments,
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

// 📚 GET /api/admin/blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// 🔍 GET /api/admin/blogs/:id
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

// ➕ POST /api/admin/blogs
const addBlog = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Missing fields" });

  try {
    const newBlog = new Blog({ title, content });
    await newBlog.save();
    res.status(201).json({ message: "Blog added", blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: "Failed to add blog" });
  }
};

// ✏️ PUT /api/admin/blogs/:id
const updateBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog updated", blog: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
};


// 🗑️ DELETE /api/admin/blogs/:id
const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

module.exports = {
  getStats,
  getAllBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog
};
