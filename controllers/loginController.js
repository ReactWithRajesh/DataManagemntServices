const express = require('express');
var router = express.Router();
const { generateToken, verifyToken, login_v2, verifyUser } = require('../authentication')


const jwt = require('jsonwebtoken')

router.post('/', (req, res) => { generateToken(req, res) });

//for login token With v2
//router.post('/', (req, res) => { login_v2(req, res) });

module.exports = router