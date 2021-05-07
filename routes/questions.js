var express = require("express");
var router = express.Router();
const { Question, Answer, QuestionVote, AnswerVote, Category, Profile } = require("../db/models");
const { requireAuth } = require("../auth");
const { asyncHandler } = require("./utils");
const sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
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
      {
        model:Category
      },
      {
        model: Profile
      }
    ],
  });

  //database pull for question score
  const questionScore = await QuestionVote.findAll({
    attributes: [[sequelize.fn('sum', sequelize.col('voteSum')), 'total']],
    where: { questionId: id }
  })
  if (questionScore[0].dataValues.total !== null) {
    question.score = questionScore[0].dataValues.total;



  } else {
    question.score = 0;
  }
  await question.save();


  //database pull for answer score
  const answerScore = await AnswerVote.findAll({

  })

  const categoryList = await Category.findAll();
  let isQuestionAsker = false;
  if (req.session.auth) {
    const { userId } = req.session.auth;
    if (userId === question.userId) isQuestionAsker = true;
  }

  
  res.render('question', { question, categoryList, isQuestionAsker })
})


//DELETE /questions/:id
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

// POST /questions/:id/vote/votetype
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

    const question = await Question.findByPk(questionId);
    const score = await QuestionVote.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('voteSum')), 'total']],
        where: {questionId: question.id}
    })
    if (score[0].dataValues.total !== null) {
      question.score = score[0].dataValues.total;
    } else {
      question.score = 0;
    }
    await question.save();
    
    res.end();
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
    const question = await Question.findByPk(questionId);
    const score = await QuestionVote.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('voteSum')), 'total']],
        where: {questionId: question.id}
    })
    if (score[0].dataValues.total !== null) {
      question.score = score[0].dataValues.total;
    } else {
      question.score = 0;
    }
    await question.save();
    
    res.send();
  })
);


module.exports = router;
