const jwt = require('jsonwebtoken');

//token validation 
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1]
        req.token = token
        next()
    } else {
        res.status(403).send({ msg: 'Invalid Request.' })
    }

}

const generateToken = (req, res) => {
    const user = req.body
    console.log(user)
    jwt.sign({ user: user }, "secretkey", (err, token) => {
        if (err) return res.send({ err: err.message })
        res.json({ token })
    });
}



const verifyUser = (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) res.status(401).send({ err: err.message })
        else res.json({ msg: 'Post added', authData })
    });
}

module.exports()


