const express = require("express");
require("dotenv").config()
const jwt = require("jsonwebtoken");
const { connection } = require("./config/db");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { users } = require("./routes/users.routes");
const { authenicate } = require("./middlewares/authentication");
const { posts } = require("./routes/posts.routes");
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/users", users);
app.use(authenicate);
app.use("/posts", posts);


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log(`Listening on PORT ${process.env.port}`);
});