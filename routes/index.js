var express = require('express');
var router = express.Router();
const { asyncHandler } = require("./utils");
const { Profile, Question, Answer, QuestionVote, Category } = require('../db/models')
const sequelize = require('sequelize');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  res.set('Cache-Control', 'no-store')

  const orderedQuestions = await Question.findAll({
    include: [Profile, Answer, QuestionVote, Category],
    order: [['score', 'DESC']],
    limit: 10
  })


  const categoryList = await Category.findAll();

  req.session.save(() =>
  res.render('index', {
    title: 'Welcome to Dark Overflow, get answers to your javascript problems.',
    questions: orderedQuestions,
    categoryList
  }));
  
}));

module.exports = router;
