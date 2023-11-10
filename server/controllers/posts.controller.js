const Post = require("../models/posts.model");
const User = require("../models/users.model");

const createPost = async (userId, postData) => {
  const { caption, image } = postData;

  try {
    const user = await User.findById(userId);
    const post = {
      caption,
      image,
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
    const posts = await Post.find().populate(
      "author",
      "_id username profle_img"
    );
    return posts;
  } catch (error) {
    console.error("Error getting posts", error);
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId)
      .populate("author", "_id username profle_img")
      .populate("likes", "_id username profle_img");
    return post;
  } catch (error) {
    console.error("Error getting post", error);
  }
};

const likePost = async (userId, postId) => {
  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
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
    const post = await Post.findById(postId).populate("likes", "_id username");
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
    });
    return updatedPost;
  } catch (error) {
    console.error("Error updating post", error);
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
};
