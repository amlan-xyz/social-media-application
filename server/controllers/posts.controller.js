const Post = require("../models/posts.model");
const User = require("../models/users.model");

const createPost = async (userId, postData) => {
  try {
    const user = await User.findById(userId);
    const post = {
      caption: postData.caption,
      image: postData.image,
      author: user,
    };
    const newPost = new Post(post);
    await newPost.save();
    user.posts.push(newPost);
    await user.save();
    return newPost;
  } catch (error) {
    console.error("Error creating post:-", error);
  }
};

const getAllPosts = async () => {
  try {
    const posts = await Post.find()
      .populate("author", "_id username profle_img")
      .populate("likes", "_id username profle_img")
      .populate("comments.comment_by", "_id username profle_img");
    return posts;
  } catch (error) {
    console.error("Error getting posts", error);
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId)
      .populate("author", "_id username profle_img")
      .populate("likes", "_id username profle_img")
      .populate("comments.comment_by", "_id username profle_img");
    return post;
  } catch (error) {
    console.error("Error getting post", error);
  }
};

const likePost = async (userId, postId) => {
  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId)
      .populate("likes", "_id username")
      .populate("author")
      .populate("comments.comment_by", "_id username profle_img");
    post.likes.push(user);
    await post.save();
    return post;
  } catch (error) {
    console.error("Error liking post", error);
  }
};

const unlikePost = async (userId, postId) => {
  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId)
      .populate("likes", "_id username")
      .populate("author")
      .populate("comments.comment_by", "_id username profle_img");
    const updatedLikes = post.likes.filter(
      ({ _id }) => _id.toHexString() !== user._id.toHexString()
    );
    post.likes = updatedLikes;
    await post.save();
    return post;
  } catch (error) {
    console.error("Error unliking post", error);
  }
};

const deletePost = async (postId) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    return deletedPost;
  } catch (error) {
    console.error("Error deleting post", error);
  }
};

const updatePost = async (postId, updatedData) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
      new: true,
    })
      .populate("likes", "_id username")
      .populate("comments.comment_by", "_id username profle_img")
      .populate("author");
    return updatedPost;
  } catch (error) {
    console.error("Error updating post", error);
  }
};

const addComment = async (userId, postId, commentData) => {
  try {
    const [post, user] = await Promise.all([
      Post.findById(postId)
        .populate("likes", "_id username")
        .populate("comments.comment_by", "_id username profle_img")
        .populate("author"),
      User.findById(userId),
    ]);
    const newComment = {
      comment: commentData.newComment,
      comment_by: user,
    };
    post.comments.push(newComment);
    await post.save();
    return post;
  } catch (error) {
    console.error("Error adding comment", error);
  }
};

const removeComment = async (userId, postId, commentId) => {
  try {
    const [post, user] = await Promise.all([
      Post.findById(postId)
        .populate("likes", "_id username")
        .populate("comments.comment_by", "_id username profle_img")
        .populate("author"),
      User.findById(userId),
    ]);
    const toDeleteComment = post.comments.find(
      ({ _id }) => _id.toHexString() === commentId
    );
    if (toDeleteComment.comment_by.username === user.username) {
      const updatedComments = post.comments.filter(
        ({ _id }) => _id.toHexString() !== toDeleteComment._id.toHexString()
      );
      post.comments = updatedComments;
      await post.save();
      return post;
    } else {
      throw "Not authorized to delete comment";
    }
  } catch (error) {
    console.error("Error removing comment", error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  unlikePost,
  deletePost,
  updatePost,
  addComment,
  removeComment,
};
