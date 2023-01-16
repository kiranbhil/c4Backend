const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    userID: String
});

const PostsModel = mongoose.model("post", postSchema);

module.exports = { PostsModel };