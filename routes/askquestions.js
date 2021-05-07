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
});

router.get('/:id(\\d+)', requireAuth, csrfProtection, async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    
    const question = await Question.findByPk(id);
    const { userId } = req.session.auth;
    if (question.userId !== userId) {
        res.redirect(`/questions/${id}`)
    }
    const categoryList = await Category.findAll();

    res.render('editQuestions', {
        title: "Edit a Question",
        csrfToken: req.csrfToken(),
        categoryList,
        question
    })
});


const questionValidators = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title for your question.'),
    check('text')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a question.')
];

router.post('/:id(\\d+)', requireAuth, csrfProtection, questionValidators, async (req, res, next) => {
    console.log('*****************************************************FIRSTtest');
    const id = parseInt(req.params.id, 10);
    const categoryList = await Category.findAll();
    const { userId } = req.session.auth;
    const { title, text , chosenCategory } = req.body;
    const questionErrors = validationResult(req);
    const question = await Question.findByPk(id);
    

    let errors = [];

    if (questionErrors.isEmpty()) {
        question.title = title;
        question.text = text;
        question.categoryId = chosenCategory;
        await question.save();
        console.log('*****************************************************test');
        //return res.redirect(`/questions/${question.id}`)
        res.json()

    } else {
        errors = questionErrors.array().map((error) => error.msg);
    }

    res.json();

    // res.render('editQuestions', {
    //     title: "Edit a Question",
    //     csrfToken: req.csrfToken(),
    //     categoryList,
    //     question
    // })
});



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
        return res.redirect(`/questions/${question.id}`)

    } else {
        errors = questionErrors.array().map((error) => error.msg);
    }

    res.render('askQuestions', {
        errors,
        csrfToken: req.csrfToken(),
        title: 'Ask a Question',
        categoryList
    });
}))


module.exports = router;
