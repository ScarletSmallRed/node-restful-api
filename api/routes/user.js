const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { check } = require('express-validator/check');
const validationResult = require('express-validator/check').validationResult;
const jwt = require("jsonwebtoken");

const User = require("./../models/user");

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
], (req, res, next) => {
    var errors = validationResult(req);
    console.log('errors:', errors);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.mapped() });
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: "User created"
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    });
});

router.post("/login", (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    console.log("result:", result)
                    if (err) {
                        res.status(401).json({
                            message: "Auth failed"
                        })
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user.email,
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        res.status(200).json({
                            message: "Auth successful",
                            token
                        })
                    } else {
                        res.status(401).json({
                            message: "Password is wrong"
                        })
                    }
                })
            } else {
                res.status(401).json({
                    message: "User doesn't exist"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
})

router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted",
                result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;