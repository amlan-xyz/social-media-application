const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const Post = require("../models/posts.model");
const User = require("../models/users.model");

const signup = async (userData) => {
  const { username, name, email, password } = userData;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
      username,
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error("Error creating user :-", error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find()
      .populate("followers", "username")
      .populate("following", "username")
      .populate("posts");
    return users;
  } catch (error) {
    console.error("Error geting users :-", error);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
      .populate("followers", "username")
      .populate("following", "username")
      .populate("posts");
    return user;
  } catch (error) {
    console.error("Error geting user data :-", error);
  }
};

const login = async (user, password) => {
  try {
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) {
      return user;
    } else {
      throw "Incorrect Password";
    }
  } catch (error) {
    console.error("Error logging in :-", error);
  }
};

const updateProfile = async (userId, updatedData) => {
  try {
    const updatedProfile = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    })
      .populate("followers", "username")
      .populate("following", "username")
      .populate("posts");
    await updatedProfile.save();
    return updatedProfile;
  } catch (error) {
    console.error("Error updating profile:-", error);
  }
};

const followUser = async (userId, followUserId) => {
  try {
    const user = await User.findById(userId)
      .populate("followers", "username")
      .populate("following", "username")
      .populate("posts");
    const followUser = await User.findById(followUserId)
      .populate("followers", "username")
      .populate("following", "username")
      .populate("posts");
    user.following.push(followUser);
    followUser.followers.push(user);
    await user.save();
    await followUser.save();
    return { user, followUser };
  } catch (error) {
    console.error("Error following user", error);
  }
};

const unfollowUser = async (userId, unfollowUserId) => {
  try {
    const user = await User.findById(userId)
      .populate("followers", "username")
      .populate("following", "username")
      .populate("posts");
    const unfollowUser = await User.findById(unfollowUserId)
      .populate("followers", "username")
      .populate("following", "username")
      .populate("posts");
    const updatedFollowing = user.following.filter(
      ({ _id }) => _id.toHexString() !== unfollowUser._id.toHexString()
    );
    user.following = updatedFollowing;
    const updatedFollowers = unfollowUser.followers.filter(
      ({ _id }) => _id.toHexString() !== user._id.toHexString()
    );
    unfollowUser.followers = updatedFollowers;
    await user.save();
    await unfollowUser.save();
    return { user, unfollowUser };
  } catch (error) {
    console.error("Error unfollowing user", error);
  }
};

const addBookmark = async (userId, postId) => {
  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    user.bookmarks.push(post);
    await user.save();
    return post;
  } catch (error) {
    console.error("Error adding bookmark", error);
  }
};

const removeBookmark = async (userId, postId) => {
  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    const updatedBookmarks = user.bookmarks.filter(
      ({ _id }) => _id.toHexString() !== post._id.toHexString()
    );
    user.bookmarks = updatedBookmarks;
    await user.save();
    return post;
  } catch (error) {
    console.error("Error removing bookmark", error);
  }
};

const getAllBookmarks = async (userId) => {
  try {
    const user = await User.findById(userId).populate("bookmarks");
    return user.bookmarks;
  } catch (error) {
    console.log("Error getting bookmarks", error);
  }
};

const changeAvatar = async (userId, avatar) => {
  try {
    const user = await User.findById(userId)
      .populate("followers", "username")
      .populate("following", "username")
      .populate("posts");
    if (user.image?.public_id) {
      await cloudinary.v2.uploader.destroy(user.image.public_id);
    }
    user.image = avatar;
    await user.save();
    return user;
  } catch (error) {
    console.error("Error updaing avatar", error);
  }
};

module.exports = {
  signup,
  getAllUsers,
  getUserById,
  login,
  updateProfile,
  followUser,
  unfollowUser,
  getAllBookmarks,
  addBookmark,
  removeBookmark,
  changeAvatar,
};
