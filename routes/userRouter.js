const express = require('express');

const userRouter = express.Router();

const authController = require('../controllers/authController');

userRouter.post('/signup', authController.postSignup);
userRouter.post('/login', authController.postLogin);
userRouter.get('/user/:id', authController.getUser);

module.exports = userRouter;

