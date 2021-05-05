var express = require('express');
var router = express.Router();
const { asyncHandler } = require("./utils");
const sequelize = require('sequelize');
const { Question, Answer, QuestionVote, AnswerVote } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth')

// GET /questions/:id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    const question = await Question.findByPk(parseInt(id, 10), {
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

    const score = await QuestionVote.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('voteSum')), 'total']],
        where: { questionId: id }
    })
    if (score[0].dataValues.total !== null) {
        question.score = score[0].dataValues.total;
    } else {
        question.score = 0;
    }
    await question.save();
    res.render('question', { question})
})

// POST /questions/:id/vote/votetype
router.post('/:id(\\d+)/vote/:votetype(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    let voteSum = parseInt(req.params.votetype, 10);
    if (voteSum === 2) {
        voteSum = -1;
    }
    const { userId } = req.session.auth;
    const vote = await QuestionVote.create({ userId, questionId, voteSum });

    res.send();
}));

// DELETE /questions/:id/vote
router.delete('/:id(\\d+)/vote', requireAuth, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const { userId } = req.session.auth;
    const vote = await QuestionVote.findOne({
        where: {
            questionId,
            userId
        }
    });
    vote.destroy();
    res.send();
}));


module.exports = router;
