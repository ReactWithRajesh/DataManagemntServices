const express = require('express');
var router = express.Router();
const { generateToken, verifyToken, verifyUser } = require('../authentication')


const jwt = require('jsonwebtoken')

router.post('/', (req, res) => { generateToken(req, res) });

module.exports = router