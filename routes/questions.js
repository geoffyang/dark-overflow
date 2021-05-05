var express = require("express");
var router = express.Router();
// const { csrfProtection, asyncHandler, } = require("./utils");
// const bcrypt = require('bcryptjs');
const { Question, Answer, QuestionVote, AnswerVote } = require("../db/models");
// const { check, validationResult } = require('express-validator');
// const { loginUser, logoutUser } = require('../auth')
const { requireAuth } = require("../auth");
const { asyncHandler } = require("./utils");

router.get("/:id", async (req, res, next) => {
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

  let isUser;
  const { userId } = req.session.auth;
  if (userId === question.userId) isUser = true;

  console.log(question.dataValues.Answers);
  res.render("question", {
    isUser,
    question,
  });
});

router.delete("/:id",
   requireAuth,
  asyncHandler(async (req, res) => {
    const question = await Question.findByPk(parseInt(req.params.id, 10),{
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

module.exports = router;
