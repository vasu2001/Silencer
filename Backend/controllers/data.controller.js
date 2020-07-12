const userModel = require("../db/user.model");
const questionModel = require("../db/question.model");
const ObjectId = require("mongoose").Types.ObjectId;

const userId = new ObjectId("5f0a66bd1c0fce782bcf0b4d");

const getAllQues = async (req, res) => {
  const dbResponse = await questionModel.find({ userId });
  res.send(dbResponse);
};

const newQues = async (req, res) => {
  console.log(req.body);
  if (req.body?.answer == undefined || req.body.question === undefined) {
    res.status(400).send({ error: "provide ans and ques" });
    return;
  }

  try {
    const question = new questionModel({
      userId,
      answer: req.body.answer,
      question: req.body.answer,
      box: "1",
      _id: new ObjectId(),
    });

    const saveResponse = await question.save();
    res.send(saveResponse);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllBoxes = async (req, res) => {
  const dbResponse = await questionModel.find({ userId }, "_id box");
  res.send(dbResponse);
};

const submitSession = async (req, res) => {
  if (req.body?.newSessionNo === undefined || req.body.newBoxes === undefined) {
    res.status(400).send({ error: "send proper data" });
    return;
  }

  try {
    await userModel.updateOne(
      { _id: userId },
      { session: req.body.newSessionNo }
    );

    // const newBoxes = [];
    // const updateQuestionIds = [];
    // req.body.newBoxes.forEach((ele) => {
    //   newBoxes.push(ele.box);
    //   updateQuestionIds.push(new ObjectId(ele._id));
    // });

    // let i = 0;
    // const getNextBox = () => {
    //   i = i + 1;
    //   console.log(i - 1);
    //   return newBoxes[i - 1];
    // };

    // await questionModel.updateMany(
    //   { userId, _id: { $in: updateQuestionIds } },
    //   { $set: { box: getNextBox() } }
    // );

    for (const newBox of req.body.newBoxes) {
      await questionModel.updateOne(
        { userId, _id: new ObjectId(newBox._id) },
        { $set: { box: newBox.box } }
      );
    }

    res.send({ message: "success" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllQues,
  newQues,
  getAllBoxes,
  submitSession,
};
