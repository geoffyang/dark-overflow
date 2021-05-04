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

    res.render('askQuestions', {
        title: "Ask a Question",
        csrfToken: req.csrfToken(),
    })
})

// POST /askQuestions:
router.post('/', csrfProtection, asyncHandler(async (req, res, next) => {
    // add userName to DB build

    // render form with category options from DB
    const categoryList = await Category.findAll();
    res.render('askQuestions', {
        csrfToken: req.csrfToken(),
        categoryList
    })

    const { questionText, chooseCategory } = req.body;
    const question = Question.build({
        title: title,
        text: text,
        // categoryID: chosenCategory, //this is currently not ID value
        // userID: xxx,
        score: 0
    })
}))


module.exports = router;
