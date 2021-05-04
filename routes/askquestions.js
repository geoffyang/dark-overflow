var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler, } = require("./utils");
const { Question } = require('../db/models');
// const { check, validationResult } = require('express-validator');
// const { loginUser, logoutUser } = require('../auth')

// to-do: add form validators

router.get('/', csrfProtection, async (req, res, next) => {
    const question = await Question.findByPk(req.params.id);
    res.render('askquestion', {
        title: "Ask a Question"
    })
})

router.post('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const question = await Question.findByPk(req.params.id);
    res.render('question', {
        question
    })
}))


module.exports = router;
