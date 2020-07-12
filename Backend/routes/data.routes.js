const router = require("express").Router();
const dataController = require("../controllers/data.controller");

router.get("/getAllQues", dataController.getAllQues);

router.post("/newQues", dataController.newQues);

router.get("/getAllBoxes", dataController.getAllBoxes);

router.post("/submitSession", dataController.submitSession);

module.exports = router;
