require("./db/connect");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.json());

app.use("/main", require("./routes/data.routes"));

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
