const env = require('dotenv')
env.config()
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "defaultSecretKey";


//token validation 
const verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(' ')[1];
            req.token = token;
            next && next();
        } else {
            throw new Error("Token is missing");
        }
    } catch (err) {
        res.status(401).send({ error: err.message });
        console.error("Error during token verification: " + err);
    }

}


const login_v2 = (req, res) => {
    console.log("LOGINV2");

    var request = require("request");
    var body = {
        "client_id": process.env.clientId,
        "client_secret": process.env.clientSecret,
        "audience": process.env.audience,
        "grant_type": "client_credentials"
    }
    console.log('Body',body)

    var options = {
        method: 'POST',
        url: 'https://react-rajesh.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    };
    console.log('Bodyoptions',options)

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let result = JSON.parse(body)
        const {access_token,err} =result
        console.log('result',result)
        res.json({ result })
    });
}

const generateToken = (req, res) => {
    const user = req.body;
    console.log(user);
    // Set the expiration time for the token (e.g., 1 hour)
    const expiresIn = 3600; // 1 hour in seconds

    jwt.sign({ ...user }, JWT_SECRET, { expiresIn }, (err, token) => {
        if (err) return res.send({ err: err.message });
        res.json({ token });
    });
}



const verifyUser = (req, res, next) => {
    jwt.verify(req.token, JWT_SECRET, {
        "alg": "HS384",
        "typ": "JWT",
        "kid": "FLe0JBVBQA5YXwSqxbvsM"
    }, (err, authData) => {
        if (err) res.status(401).send({ err: err })
        else {
            console.log("Logged in As: ", { user: authData?.userName?.trim() || authData?.email?.trim() })
            next && next()
        }
    });

}

module.exports = { generateToken, login_v2, verifyToken, verifyUser }


