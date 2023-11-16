const express = require("express");

const router = express.Router();

//controllers
const {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  unlikePost,
  deletePost,
  updatePost,
} = require("../controllers/posts.controller");
const { authVerify } = require("../middlewares/auth.middleware");

router.post("", authVerify, async (req, res) => {
  const { userId } = req.user;
  const postData = req.body;
  try {
    const newPost = await createPost(userId, postData);
    if (newPost) {
      res.status(201).json({
        message: "Post created",
        post: newPost,
      });
    } else {
      res.status(400).json({ message: "Post creation failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("", async (req, res) => {
  try {
    const posts = await getAllPosts();
    if (posts) {
      res.status(200).json({
        message: "Posts found",
        posts,
      });
    } else {
      res.status(404).json({ message: "Posts not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await getPostById(postId);
    if (post) {
      res.status(200).json({
        message: "Post found",
        post,
      });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const deletedPost = await deletePost(postId);
    if (deletedPost) {
      res.status(200).json({
        message: "Post deleted",
        post: deletedPost,
      });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedPost = await updatePost(postId, updatedData);
    if (updatedPost) {
      res.status(200).json({
        message: "Post updated",
        post: updatedPost,
      });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.post("/:id/like", authVerify, async (req, res) => {
  const { userId } = req.user;
  const postId = req.params.id;
  try {
    const likedPost = await likePost(userId, postId);
    if (likedPost) {
      res.status(200).json({
        message: "Post liked",
        post: likedPost,
      });
    } else {
      res.status(400).json({ message: "Failed to like post" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.post("/:id/unlike", authVerify, async (req, res) => {
  const { userId } = req.user;
  const postId = req.params.id;
  try {
    const unlikedPost = await unlikePost(userId, postId);
    if (unlikedPost) {
      res.status(200).json({
        message: "Post unliked",
        post: unlikedPost,
      });
    } else {
      res.status(400).json({ message: "Failed to unlike post" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
