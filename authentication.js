const jwt = require('jsonwebtoken');
const JWT_SECRET =
    "goK!pusp6ThEdURUtRenOwUhAsRjSWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";


//token validation 
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1]
        req.token = token
        next()
    } else {
        console.log({ msg: 'Unauthorized Request.' })
        res.status(401).send({ msg: 'Unauthorized Request.' })
    }

}

const generateToken = (req, res) => {
    const user = req.body
    console.log(user)
    jwt.sign({ ...user }, JWT_SECRET, (err, token) => {
        if (err) return res.send({ err: err.message })
        res.json({ token })
    });
}



const verifyUser = (req, res, next) => {
    jwt.verify(req.token, JWT_SECRET, (err, authData) => {
        if (err) res.status(401).send({ err: err.message })
        else {
            console.log("Logged in As: ", { userName: authData.userName, email: authData.email })
            next && next()
        }
    });

}

module.exports = { generateToken, verifyToken, verifyUser }
