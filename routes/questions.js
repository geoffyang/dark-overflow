var express = require("express");
var router = express.Router();
const {
  Question,
  Answer,
  QuestionVote,
  AnswerVote,
  Category,
} = require("../db/models");
const { requireAuth } = require("../auth");
const { asyncHandler } = require("./utils");

const sequelize = require("sequelize");
const { check, validationResult } = require("express-validator");
const { log } = require("debug");

// GET /questions/:id
router.get("/:id", async (req, res, next) => {
  console.log("getting question");
  const id = req.params.id;
  const question = await Question.findByPk(parseInt(id, 10), {
    include: [
      {
        model: Answer,
        include: [
          {
            model: AnswerVote,
          },
        ],
      },
      {
        model: QuestionVote,
      },
    ],
  });
  //database pull for current score
  const score = await QuestionVote.findAll({
    attributes: [[sequelize.fn("sum", sequelize.col("voteSum")), "total"]],
    where: { questionId: id },
  });
  if (score[0].dataValues.total !== null) {
    question.score = score[0].dataValues.total;
  } else {
    question.score = 0;
  }
  await question.save();
  const categoryList = await Category.findAll();

  let isQuestionAsker;
  const { userId } = req.session.auth;
  if (userId === question.userId) isQuestionAsker = true;

  // console.log(question.dataValues.Answers);
  res.render("question", {
    isQuestionAsker,
    question,
  });
});

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const question = await Question.findByPk(parseInt(req.params.id, 10), {
      include: [
        {
          model: Answer,
          include: [
            {
              model: AnswerVote,
            },
          ],
        },
        {
          model: QuestionVote,
        },
      ],
    });
    const { userId } = req.session.auth;
    question.destroy();
    res.send();
  })
);
// GET /questions/:id/vote/votetype
router.post(
  "/:id(\\d+)/vote/:votetype(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    let voteSum = parseInt(req.params.votetype, 10);
    if (voteSum === 2) {
      voteSum = -1;
    }
    const { userId } = req.session.auth;
    const vote = await QuestionVote.create({ userId, questionId, voteSum });

    res.send();
  })
);

// DELETE /questions/:id/vote
router.delete(
  "/:id(\\d+)/vote",
  requireAuth,
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const { userId } = req.session.auth;
    const vote = await QuestionVote.findOne({
      where: {
        questionId,
        userId,
      },
    });
    vote.destroy();
    res.send();
  })
);

module.exports = router;
