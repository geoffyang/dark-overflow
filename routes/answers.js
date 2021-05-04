var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler, } = require("./utils");
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth } = require('../auth');
const { post } = require('./users');


router.post('/:id(\\d+)/vote/:votetype(\\d+)', requireAuth, asyncHandler(async(req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const voteSum = parseInt(req.params.votetype, 10);
    if (voteSum === 2) voteSum = -1;
    //const { userId } = req.session.auth;
    const vote = await db.AnswerVote.create({userId: 1, answerId, voteSum});
}));

router.delete('/:id(\\d+)/vote', requireAuth, asyncHandler(async(req, res) => {
    const answerId = parseInt(req.params.id, 10);
    //const { userId } = req.session.auth;
    const userId = 1;
    const vote = await db.AnswerVote.findOne({ where: {
        answerId,
        userId
    }});

    vote.destroy();

}));



module.exports = router;

