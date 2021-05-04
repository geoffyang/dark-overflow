var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler, } = require("./utils");
const { Question, Category } = require('../db/models');
// const { check, validationResult } = require('express-validator');
// const { loginUser, logoutUser } = require('../auth')

// to-do: add form validators

// GET /askQuestions:
router.get('/', csrfProtection, async (req, res, next) => {

    const question = Question.build({});
    const categoryList = await Category.findAll();
    res.render('askQuestions', {
        title: "Ask a Question",
        csrfToken: req.csrfToken(),
        categoryList
    })
})

// POST /askQuestions:
router.post('/', csrfProtection, asyncHandler(async (req, res, next) => {
    // add userName to DB build

    res.render('askQuestions', {
        csrfToken: req.csrfToken()
    })
    const { userId } = req.session.auth;
    const { title, text , chosenCategory } = req.body;
    console.log(chosenCategory)
    const question = await Question.create({
        userId,
        title: title,
        text: text,
        categoryId: chosenCategory,
        // userID: xxx,
        score: 0
    })
}))


module.exports = router;
