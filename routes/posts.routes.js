const express = require("express");

const { PostsModel } = require("../modles/post.model");

const posts = express.Router();

posts.get("/", async (req, res) => {
  try {
    const data = await PostsModel.find();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

posts.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_post = new PostsModel(payload);
    await new_post.save();
    res.send({ massage: "Post Created Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

posts.patch("/update/:id", async (req, res) => {
  try {
    const payload = req.body;
    const id = req.params.id;
    const userID = req.body.userID;
    const post = await PostsModel.findOne({ _id: id });
    if (userID !== post.userID) {
      res.send("Not Authorised");
    } else {
      await PostsModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ massage: "Post Updated Successfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

posts.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userID = req.body.userID;
    const post = await PostsModel.findOne({ _id: id });
    if (userID !== post.userID) {
      res.send("Not Authorised");
    }
   else{
    await PostsModel.findByIdAndDelete({ _id: id });
    res.send({ massage: "Post Deleted Successfully" });
   }
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

module.exports = { posts };