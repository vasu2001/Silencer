require("./db/connect");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./middlewares/auth.middleware");

const express = require("express");
const app = express();
const port = 8080; // default port to listen

app.use(cors());
app.use(bodyParser.json());

app.use("/main", auth, require("./routes/data.route"));
app.use("/auth", require("./routes/auth.route"));

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
