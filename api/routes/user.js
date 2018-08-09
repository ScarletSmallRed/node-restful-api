const express = require("express");
const router = express.Router();
const { check } = require('express-validator/check');
const checkAuth = require('./../middlewares/check-auth')

const userControler = require('./../controllers/user')

router.post("/signup", [
    check('email')
        .isEmail()
        .withMessage('must be an email'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('password be at least 6 chars long'),
    check('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field')
        .exists()
        .custom((value, { req }) => value === req.body.password)
], userControler.user_signup);

router.post("/login", userControler.user_login)

router.delete("/:userId", checkAuth, userControler.user_delete);

module.exports = router;