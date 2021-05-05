var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler, } = require("./utils");
const bcrypt = require('bcryptjs');
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth')

const userValidators = [
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Username')
    .isLength({ max: 50 })
    .withMessage('Username must not be more than 50 characters long'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 50 })
    .withMessage('First Name must not be more than 50 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name')
    .isLength({ max: 50 })
    .withMessage('Last Name must not be more than 50 characters long'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return db.Profile.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
  // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
  // .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  , check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage("Passwords don't match.")
];

/* GET /users/signup */
router.get('/signup', csrfProtection, asyncHandler (async(req, res, next) => {

  const user = db.Profile.build({})
  const categoryList = await db.Category.findAll();
  res.render('signup', { user, csrfToken: req.csrfToken(), categoryList });
}));
// POST /users/signup
router.post('/signup', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  } = req.body;
  const user = db.Profile.build({ userName, firstName, lastName, email });
  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save()
    loginUser(req, res, user);
    res.redirect('/');
  } else {
    const categoryList = await db.Category.findAll();
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('signup', {
      title: 'Register',
      errors,
      user,
      csrfToken: req.csrfToken(),
      categoryList
    });
  }

}));

const loginValidators = [
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
];

// GET /users/login
router.get('/login', csrfProtection, asyncHandler(async(req, res) => {
  const categoryList = await db.Category.findAll();
  res.render('login', {
    csrfToken: req.csrfToken(),
    title: 'Login',
    categoryList
  })
}));

// POST /users/login
router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res) => {

  const { userName, password } = req.body;
  const loginErrors = validationResult(req);
  let errors = [];
  if (loginErrors.isEmpty()) {

    const user = await db.Profile.findOne({ where: { userName } });

    if (user) {
      const authorized = await bcrypt.compare(password, user.hashedPassword.toString());
      if (authorized) {
        loginUser(req, res, user);
        return res.redirect('/');
      }
    }
    errors.push('Login failed for that username and password');

  } else {
    errors = loginErrors.array().map((error) => error.msg);
  }

  const categoryList = await db.Category.findAll();
  res.render('login', {
    errors,
    csrfToken: req.csrfToken(),
    title: 'Login',
    categoryList
  });

}));

router.post("/logout", (req, res) => {

  logoutUser(req, res)

  req.session.save(() => res.redirect("/"))

});

module.exports = router;
