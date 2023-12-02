require("dotenv").config();
require("./db/connect");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

//cors
app.use(cors());

//routers
const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");

app.get("/", (req, res) => {
  res.send("Social Media Application");
});

//routes
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
