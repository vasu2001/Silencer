const jwt = require("jsonwebtoken");

const secretKey = "MY_SECRET_KEY";

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ error: "must be logged in" });
    return;
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, secretKey, (err, payload) => {
    if (err) {
      console.log(err);
      res.status(401).send({ error: "must be logged in" });
    } else {
      req.userId = payload.userId;
      next();
    }
  });
};

module.exports = auth;
