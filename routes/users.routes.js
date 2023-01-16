const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../modles/user.model");
const users = express.Router();


users.post("/register", async (req, res) => {
    const { email, password,name,gender } = req.body;
    const usePresent = await UserModel.findOne({ email });
    if (usePresent?.email) {
      res.send("Try logging in, already exist");
    }
    else{
      try {
        bcrypt.hash(password, 5, async function (err, hash) {
          const user = new UserModel({name, email,gender, password: hash });
          await user.save();
          res.send("Sign-Up Successfull");
        });
      } catch (err) {
        console.log(err);
        res.send("Something went wrong, pls try again later");
      }
    }
  });

  users.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.find({ email });
  
      if (user.length > 0) {
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function (err, result) {
          if (result) {
            const token = jwt.sign({ userID: user[0]._id }, "hush");
            res.send({ msg: "Login successfull", token: token });
          } else {
            res.send("Login failed");
          }
        });
      } else {
        res.send("Login failed");
      }
    } catch {
      res.send("Something went wrong, please try again later");
    }
  });
  
module.exports = {users}