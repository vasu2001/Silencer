const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    question: String,
    answer: String,
    box: String,
    userId: { type: mongoose.Schema.Types.ObjectId },
  },
  {
    id: false,
  }
);

module.exports = mongoose.model("Question", questionSchema);
