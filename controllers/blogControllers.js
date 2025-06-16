
const Blog = require("../models/Blog");

const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
};

const getBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
};

const createBlog = async (req, res) => {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json(newBlog);
};

const updateBlog = async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updatedBlog);
};

const deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
};

const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        res.json(blog);
    } catch (error) {
        res.status(400).json({ error: "Invalid blog ID" });
    }
}

const addComment = async (req, res) => {
    try {
        const { name, text } = req.body;
        const blog = await Blog.findByIdAndUpdate(req.params.id);

        if (!blog) return res.status(404).json({ error: "Blog not found" });

        const newComment = { name, text };
        blog.comments.push(newComment);
        await blog.save();
        res.status(201).json(blog.comments);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        blog.comments = blog.comments.filter(
            (comment) => comment._id.toString() !== commentId
        );
        await blog.save();
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    addComment,
    deleteComment,
};
