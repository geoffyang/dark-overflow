var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler, } = require("./utils");
const db = require('../db/models');
const {Question, Profile, Answer, QuestionVote, Category} = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth')
const Sequelize = require('sequelize');
const op = Sequelize.Op;

router.post('/', asyncHandler(async (req, res) => {
    const { searchString } = req.body;

    const scoreQuestions = await Question.findAll()
    
    scoreQuestions.forEach(async question => {
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
    const questions = await db.Question.findAll({
        include: [Profile, Answer, QuestionVote, Category],
        order: [['score', 'DESC']],
        limit: 10,
        where: {
            [op.or]: [
                    {
                        title: {
                            [op.iLike]: '%' + searchString + '%'
                        }       
                    },
                    {
                        text: {
                            [op.iLike]: '%' + searchString + '%'
                        }    
                    }
            ]
        }
    })

    res.render('searchresults', {
        questions
    });
}));

module.exports = router;