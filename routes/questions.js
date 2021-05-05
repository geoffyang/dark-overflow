var express = require("express");
var router = express.Router();
const { Question, Answer, QuestionVote, AnswerVote } = require("../db/models");
const { requireAuth } = require("../auth");
const { asyncHandler } = require("./utils");
const { check, validationResult } = require('express-validator');

// GET /questions/:id
router.get('/:id', async (req, res, next) => {
    const question = await Question.findByPk(parseInt(req.params.id, 10), {
        include: [
            {
                model: Answer,
                include: [
                    {
                        model: AnswerVote
                    }
                ]
            },
            {
                model: QuestionVote
            }
        ]
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
// GET /questions/:id/vote/votetype
router.post('/:id(\\d+)/vote/:votetype(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const voteSum = parseInt(req.params.votetype, 10);
    if (voteSum === 2) voteSum = -1;
    const { userId } = req.session.auth;
    const vote = await QuestionVote.create({ userId, questionId, voteSum });
    res.send();
}));

// DELETE /questions/:id/vote/votetype
// tbd by Jimmy



module.exports = router;
