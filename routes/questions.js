var express = require('express');
var router = express.Router();
const { asyncHandler } = require("./utils");
const { Question, Answer, QuestionVote, AnswerVote } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth')

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

    console.log(question.dataValues.Answers)
    res.render('question', {
        question
    })
})

// GET /questions/:id/vote/votetype
router.post('/:id(\\d+)/vote/:votetype(\\d+)', asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const voteSum = parseInt(req.params.votetype, 10);
    if (voteSum === 2) voteSum = -1;
    const {userId} = req.session.auth;
    const vote = await QuestionVote.create({ userId, questionId, voteSum });
    res.send();
}));

// DELETE /questions/:id/vote/votetype
// tbd by Jimmy


module.exports = router;
