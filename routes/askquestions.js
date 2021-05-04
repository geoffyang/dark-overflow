var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler, } = require("./utils");
const { Question, Category } = require('../db/models');
// const { check, validationResult } = require('express-validator');
// const { loginUser, logoutUser } = require('../auth')

// to-do: add form validators

router.get('/', csrfProtection, async (req, res, next) => {

    const categoryList =  await Category.findAll();
    res.render('askquestion', {
        title: "Ask a Question",
        csrfToken: req.csrfToken(),
        categoryList
    })
})

router.post('/', csrfProtection, asyncHandler(async (req, res, next) => {
    // add userName to DB build

    const { userId } = req.session.auth;
    const categoryList = await Category.findAll();
    const { title, text, chooseCategory } = req.body;
    const question = await Question.create({
        userId,
        title,
        text: text,
        categoryId: chooseCategory,
        score: 0

    })
    res.render('question', {
        csrfToken: req.csrfToken(),
        categoryList
    })
}))


module.exports = router;
