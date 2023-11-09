const express = require("express");
const router = express.Router();

//models
const User = require("../models/users.model");

//controllers
const {
  signup,
  getAllUsers,
  getUserById,
  login,
  updateProfile,
} = require("../controllers/users.controller");

router.get("", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    if (allUsers) {
      res.status(200).json({
        message: "Users data",
        data: {
          users: allUsers,
        },
      });
    } else {
      res.status(404).json({ message: "Users not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signup", async (req, res) => {
  const userData = req.body;

  const isUserExist = await User.findOne({ email: userData.email });
  if (isUserExist) {
    console.log("Duplicate user");
    res.status(409).json({ message: "User already exists" });
  } else {
    try {
      const newUser = await signup(userData);
      if (newUser) {
        res.status(201).json({
          message: "Signup successful",
          data: {
            user: newUser,
          },
        });
      } else {
        res.status(400).json({ message: "Signup failed" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    try {
      const loggedInUser = await login(user, password);
      if (loggedInUser) {
        res
          .status(200)
          .json({ message: "Login successful", data: { user: loggedInUser } });
      } else {
        res.status(401).json({ message: "Incorrect Credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.get("/profile", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await getUserById(userId);
    if (user) {
      const profile = {
        username: user.username,
        email: user.email,
        name: user.name,
        profile_img: user.profile_img,
        posts: user.posts,
        following: user.following,
        followers: user.followers,
      };
      res.status(200).json({
        message: "User profile",
        data: {
          profile,
        },
      });
    } else {
      throw "Invalid user, Please login again";
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId);
    if (user) {
      res.status(200).json({
        message: "User found",
        data: {
          user,
        },
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/profile/update", async (req, res) => {
  const { userId, updatedData } = req.body;
  try {
    const user = await getUserById(userId);
    if (user) {
      const updatedProfile = await updateProfile(userId, updatedData);
      if (updatedProfile) {
        const profile = {
          username: updatedProfile.username,
          email: updatedProfile.email,
          name: updatedProfile.name,
          profile_img: updatedProfile.profile_img,
          posts: updatedProfile.posts,
          following: updatedProfile.following,
          followers: updatedProfile.followers,
        };
        res.status(200).json({
          message: "User profile updated",
          data: {
            profile,
          },
        });
      } else {
        res.status(400).json({ message: "User profile updation failed" });
      }
    } else {
      throw "Invalid user, Please login again";
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.post("/follow/:id", async (req, res) => {
//   const { userId } = req.body;
//   const followUserId = req.params.id;

//   try {
//     const updatedUser = await followUser(userId, followUserId);
//     if (updatedUser) {
//       res
//         .status(200)
//         .json({ message: "User followed", data: { user: updatedUser } });
//     } else {
//       res.status(400).json({ message: "Failed to follow user" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router.post("/unfollow/:id", async (req, res) => {
//   const { userId } = req.body;
//   const followUserId = req.params.id;
//   try {
//     const updatedUser = await unfollowUser(userId, followUserId);
//     if (updatedUser) {
//       res
//         .status(200)
//         .json({ message: "User unfollowed", data: { user: updatedUser } });
//     } else {
//       res.status(400).json({ message: "Failed to unfollow user" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

module.exports = router;
