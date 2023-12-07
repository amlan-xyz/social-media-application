require("dotenv").config();
require("./db/connect");
require("./cloudinary/cloudinary.config");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

//cors

let allowedDomains = [
  "http://localhost:3000",
  "https://we-share-v1.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

//routers
const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");

app.get("/", (req, res) => {
  res.send("Social Media Application");
});

//routes
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
