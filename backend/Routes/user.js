const express = require('express');
const { handleUserSignup, handleUserLogin, getAllUsers, } = require('../Controllers/user');
const router =express.Router();

router.post('/signup',handleUserSignup)
router.post('/login',handleUserLogin)
router.get('/',getAllUsers)


module.exports= router;