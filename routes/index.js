var express = require('express');
var router = express.Router();
const { asyncHandler } = require("./utils");
const { Profile, Question, Answer, QuestionVote, Category } = require('../db/models')
const sequelize = require('sequelize');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  res.set('Cache-Control', 'no-store')

  const questions = await Question.findAll()
  
  questions.forEach(async question => {
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
  })

  const orderedQuestions = await Question.findAll({
    include: [Profile, Answer, QuestionVote, Category],
    order: [['score', 'DESC']],
    limit: 10
  })

  const categoryList = await Category.findAll();

  res.render('index', {
    title: 'Welcome to Dark Overflow, get answers to your javascript problems.',
    questions: orderedQuestions,
    categoryList
  });
}));

module.exports = router;
