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

// const followUser = async (userId, followUserId) => {
//   try {
//     const user = await User.findById(userId);

//     const isFollowing = user.following.some(
//       (currUser) => currUser._id === followUserId
//     );
//     if (isFollowing) {
//       throw "Already following";
//     } else {
//       const followUser = await User.findById(followUserId);
//       const updatedFollowingList = [...user.following, followUser];
//       user.following = updatedFollowingList;
//       const updatedFollowerList = [...followUser.followers, user];
//       followUser.followers = updatedFollowerList;
//       await user.save();
//       await followUser.save();
//       return user;
//     }
//   } catch (error) {
//     console.error("Error following user:-", error);
//   }
// };

// const unfollowUser = async (userId, followUserId) => {
//   try {
//     const user = await User.findById(userId);
//     const followUser = await User.findById(followUserId);
//     const updatedFollowingList = user.following.filter(
//       ({ username }) => username !== followUser.username
//     );
//     user.following = updatedFollowingList;
//     console.log(user);
//     const updatedFollowerList = followUser.followers.filter(
//       ({ _id }) => _id !== userId
//     );
//   } catch (error) {
//     console.error("Error unfollowing user:-", error);
//   }
// };

module.exports = {
  signup,
  getAllUsers,
  getUserById,
  login,
  updateProfile,
  //   followUser,
  //   unfollowUser,
};
