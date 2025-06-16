const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [String],
    image: {
      type: String, // image URL
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [CommentSchema],
    published: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      default: "Aryan",
      immutable: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("Blog", BlogSchema);
