var express = require('express');
var router = express.Router();
const { asyncHandler, } = require("./utils");
const db = require('../db/models');
const {  requireAuth } = require('../auth');


router.post('/:id(\\d+)', asyncHandler(async(req, res) => {

    const { text } = req.body;
    const questionId = parseInt(req.params.id, 10);
    //const { userId } = req.session.auth;
    const userId = 1;
    const score = 0;
    const answer = await db.Answer.create({ text, score, questionId, userId });
    res.send();
}));


module.exports = router;

