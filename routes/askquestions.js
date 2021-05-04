var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler, } = require("./utils");
const { Question, Category } = require('../db/models');
// const { check, validationResult } = require('express-validator');
// const { loginUser, logoutUser } = require('../auth')

// to-do: add form validators

router.get('/', csrfProtection, async (req, res, next) => {

    res.render('askquestion', {
        title: "Ask a Question",
        csrfToken: req.csrfToken(),

    })
})

router.post('/', csrfProtection, asyncHandler(async (req, res, next) => {
    // add userName to DB build


    const categoryList = await Category.findAll();
    const { text, chooseCategory } = req.body;
    const question = Question.build({
        text: text,
        categoryID: chooseCategory

    })
    res.render('question', {
        csrfToken: req.csrfToken(),
        categoryList
    })
}))


module.exports = router;
