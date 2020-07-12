const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  session: { type: Number, default: 1 },
});

module.exports = mongoose.model("User", userSchema);
