var express = require('express');
var router = express.Router();
const { asyncHandler } = require("./utils");
const { Profile, Question, Answer, QuestionVote, Category } = require('../db/models')

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  res.set('Cache-Control', 'no-store')

  const questions = await Question.findAll({
    include: [Profile, Answer, QuestionVote, Category],
    order: [['score', 'DESC']],
    limit: 10
  })

  res.render('index', {
    title: 'Welcome to Dark Overflow, get answers to your javascript problems.',
    questions
  });
}));

module.exports = router;
