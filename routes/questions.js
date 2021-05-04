var express = require('express');
var router = express.Router();
// const { csrfProtection, asyncHandler, } = require("./utils");
// const bcrypt = require('bcryptjs');
const { Question } = require('../db/models');
// const { check, validationResult } = require('express-validator');
// const { loginUser, logoutUser } = require('../auth')

router.get('/:id', async (req, res, next) => {
    const question = await Question.findByPk(parseInt(req.params.id, 10));

    res.render('question', {
        question
    })
})


module.exports = router;
