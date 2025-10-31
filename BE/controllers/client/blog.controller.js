import Blog from "../../models/blog.model.js";
import mongoose from "mongoose";

export const getBlogs = async (req, res) => {
  let { page = 1, limit = 10, search = "", tag } = req.query;
  page = Math.max(1, parseInt(page));
  limit = Math.min(50, parseInt(limit));

  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  if (tag) query.tags = tag;

  const total = await Blog.countDocuments(query);
  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("author", "name email role")
    .lean();

  blogs.forEach((b) => {
    b.likesCount = b.likes?.length || 0;
    b.commentsCount = b.comments?.length || 0;
    if (!b.image) b.image = null;
    else if (typeof b.image === "object" && !b.image.url) b.image.url = null;
    delete b.likes;
    delete b.comments;
  });

  res.json({
    success: true,
    data: blogs,
    pagination: { total, page, pages: Math.ceil(total / limit) },
  });
};

export const getBlogById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid Blog ID");
  }

  const blog = await Blog.findById(id)
    .populate("author", "name email role")
    .populate({
      path: "comments.user",
      select: "name email role",
    });

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const blogObject = blog.toObject();

  blogObject.likesCount = blogObject.likes?.length || 0;

  res.json({ success: true, data: blogObject });
};

export const toggleLike = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid blog ID");
  }
  console.log("User ID:", res.locals.user.id);

  const idx = blog.likes.findIndex((l) => l.equals(res.locals.user.id));

  if (idx === -1) blog.likes.push(res.locals.user.id);
  else blog.likes.splice(idx, 1);

  await blog.save();

  res.json({
    success: true,
    data: { likesCount: blog.likes.length, liked: idx === -1 },
  });
};

export const addComment = async (req, res) => {
  const { content } = req.body;
  if (!content?.trim()) {
    res.status(400);
    throw new Error("Comment content required");
  }

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  blog.comments.push({ user: res.locals.user.id, content: content.trim() });
  await blog.save();

  const populated = await Blog.findById(req.params.id).populate({
    path: "comments.user",
    select: "name email role",
  });

  res.status(201).json({ success: true, data: populated.comments });
};

export const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const comment = blog.comments.id(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  const isCommentAuthor = comment.user.equals(res.locals.user.id);
  const isBlogAuthor = blog.author.equals(res.locals.user.id);

  if (
    !isCommentAuthor &&
    !isBlogAuthor &&
    res.locals.user.role.title !== "Administrator"
  ) {
    res.status(403);
    throw new Error("Not authorized to delete this comment");
  }

  blog.comments.pull({ _id: commentId });
  await blog.save();

  res.json({ success: true, message: "Comment deleted successfully" });
};
