const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/signUp", authController.checkCredentials, authController.signUp);

router.post("/signIn", authController.checkCredentials, authController.signIn);

module.exports = router;
