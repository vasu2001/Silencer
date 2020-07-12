const mongoose = require("mongoose");

const mongoDB_URL =
  "mongodb+srv://test:1234@silencer.rjet9.mongodb.net/Silencer?retryWrites=true&w=majority";

mongoose.connect(mongoDB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("DB connected");
});
