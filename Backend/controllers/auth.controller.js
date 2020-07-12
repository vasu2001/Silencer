const userModel = require("../db/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "MY_SECRET_KEY";

const signUp = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new userModel({
      username: req.username,
      password: hash,
      session: 1,
    });
    const userRes = await user.save();

    const token = jwt.sign({ userId: userRes._id }, secretKey);
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "something wrong" });
  }
};

const signIn = async (req, res) => {
  try {
    const userRes = await userModel.findOne({ username: req.username });
    // console.log(userRes);

    const isMatch = bcrypt.compare(req.body.password, userRes?.password);
    if (isMatch) {
      const token = jwt.sign({ userId: userRes?._id }, secretKey);
      res.send({ token });
    } else {
      res.status(400).send({ error: "wrong username or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "something wrong" });
  }
};

const checkCredentials = (req, res, next) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    res.status(400).send({ error: "provide credentials" });
  } else {
    next();
  }
};

module.exports = {
  signIn,
  signUp,
  checkCredentials,
};
