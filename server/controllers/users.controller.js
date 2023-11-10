const Post = require("../models/posts.model");
const User = require("../models/users.model");

const signup = async (userData) => {
  const { username, name, email, password } = userData;
  try {
    const user = {
      username,
      name,
      email,
      password,
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
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error geting users :-", error);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error("Error geting user data :-", error);
  }
};

const login = async (user, password) => {
  try {
    const passwordMatched = user.password === password;
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
    });
    await updatedProfile.save();
    return updatedProfile;
  } catch (error) {
    console.error("Error updating profile:-", error);
  }
};

const followUser = async (userId, followUserId) => {
  try {
    const user = await User.findById(userId);
    const followUser = await User.findById(followUserId);
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
    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowUserId);
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
    return user;
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
    return user;
  } catch (error) {
    console.error("Error removing bookmark", error);
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
  addBookmark,
  removeBookmark,
};
