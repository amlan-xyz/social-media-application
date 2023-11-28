const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
//models
const User = require("../models/users.model");

//controllers
const {
  signup,
  getAllUsers,
  getUserById,
  login,
  updateProfile,
  followUser,
  unfollowUser,
  addBookmark,
  removeBookmark,
  getAllBookmarks,
} = require("../controllers/users.controller");
const { authVerify } = require("../middlewares/auth.middleware");

router.get("", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    if (allUsers) {
      res.status(200).json({
        message: "Users data",
        users: allUsers,
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
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
          expiresIn: "24h",
        });
        res.status(201).json({
          message: "Signup successful",
          user: newUser,
          token,
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

  const user = await User.findOne({ username })
    .populate("followers", "username")
    .populate("following", "username")
    .populate("posts");
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    try {
      const loggedInUser = await login(user, password);
      if (loggedInUser) {
        const token = jwt.sign({ userId: loggedInUser._id }, JWT_SECRET, {
          expiresIn: "24h",
        });
        res.status(200).json({
          message: "Login successful",
          user: loggedInUser,
          token,
        });
      } else {
        res.status(401).json({ message: "Incorrect Credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.get("/profile", authVerify, async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await getUserById(userId);
    if (user) {
      res.status(200).json({
        message: "User profile",
        profile: user,
      });
    } else {
      throw "Invalid user, Please login again";
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/bookmarks", authVerify, async (req, res) => {
  const { userId } = req.user;
  try {
    const bookmarks = await getAllBookmarks(userId);
    if (bookmarks) {
      res.status(200).json({ message: "Bookmarks found", bookmarks });
    } else {
      res.status(404).json({ message: "Bookmarks not found" });
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
        user,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/profile/update", authVerify, async (req, res) => {
  const { userId } = req.user;
  const { updatedData } = req.body;
  try {
    const user = await getUserById(userId);
    if (user) {
      const updatedProfile = await updateProfile(userId, updatedData);
      if (updatedProfile) {
        res.status(200).json({
          message: "User profile updated",
          profile: updatedProfile,
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

router.post("/follow/:id", authVerify, async (req, res) => {
  const { userId } = req.user;
  const followUserId = req.params.id;

  try {
    const updatedUser = await followUser(userId, followUserId);
    if (updatedUser) {
      res.status(200).json({
        message: "User followed",
        user: updatedUser.user,
        followUser: updatedUser.followUser,
      });
    } else {
      res.status(400).json({ message: "Failed to follow user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/unfollow/:id", authVerify, async (req, res) => {
  const { userId } = req.user;
  const unfollowUserId = req.params.id;
  try {
    const updatedUser = await unfollowUser(userId, unfollowUserId);
    if (updatedUser) {
      res.status(200).json({
        message: "User unfollowed",
        user: updatedUser.user,
        unfollowUser: updatedUser.unfollowUser,
      });
    } else {
      res.status(400).json({ message: "Failed to unfollow user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/bookmarks/:id/add", authVerify, async (req, res) => {
  const { userId } = req.user;
  const postId = req.params.id;
  try {
    const bookmark = await addBookmark(userId, postId);
    if (bookmark) {
      res.status(200).json({
        message: "Bookmark added",
        bookmark,
      });
    } else {
      res.status(400).json({ message: "Failed to add bookmark" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/bookmarks/:id/remove", authVerify, async (req, res) => {
  const { userId } = req.user;
  const postId = req.params.id;
  try {
    const removedBookmark = await removeBookmark(userId, postId);
    if (removedBookmark) {
      res.status(200).json({
        message: "Bookmark removed",
        bookmark: removedBookmark,
      });
    } else {
      res.status(400).json({ message: "Failed to remove bookmark" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
