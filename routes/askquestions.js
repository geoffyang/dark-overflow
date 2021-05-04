var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler, } = require("./utils");
const { Question, Category } = require('../db/models');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth')



// GET /askQuestions:
router.get('/', requireAuth, csrfProtection, async (req, res, next) => {

    const question = Question.build({});
    const categoryList = await Category.findAll();
    res.render('askQuestions', {
        title: "Ask a Question",
        csrfToken: req.csrfToken(),
        categoryList
    })
})

const questionValidators = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title for your question.'),
    check('text')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a question.')
];
// POST /askQuestions:
router.post('/', requireAuth, csrfProtection, questionValidators, asyncHandler(async (req, res, next) => {

    const { userId } = req.session.auth;
    const { title, text , chosenCategory } = req.body;
    const questionErrors = validationResult(req);
    const categoryList = await Category.findAll();
    const question = Question.build({
        userId,
        title: title,
        text: text,
        categoryId: chosenCategory,
        score: 0
    })

    let errors = [];

    if (questionErrors.isEmpty()) {
        
        await question.save();
        return res.redirect(`/`)

    } else {
        errors = questionErrors.array().map((error) => error.msg);
    }

    console.log(errors);
    res.render('askQuestions', {
        errors,
        csrfToken: req.csrfToken(),
        title: 'Ask a Question',
        categoryList
    });
}))


module.exports = router;
