const express = require('express');
var router = express.Router();
const { generateToken, verifyToken, login_v2, verifyUser } = require('../authentication')
const { User, decodePassword, encodePassword } = require('../models/user.model');

//insert User function
function insertRecord(req, res) {
    var user = new User()
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.mobile = req.body.mobile;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save()
        .then((docs) => {
            res.status(201).send({ msg: 'User registered successfully.' })
        })
        .catch((error) => {
            console.error("Error during insert: ", error);
            res.status(400).send({ error });
        });
}


//user registration 
router.post('/register/', async (req, res) => {
    const existingUser = await User?.findOne({ $or: [{ email: req.body.email }, { mobile: req.body.mobile }] });
    let email = existingUser ? existingUser?.email === req.body.email : false
    let mobile = existingUser ? existingUser?.mobile === req.body.mobile : false

    if (!req.body._id) {
        if (email || mobile) {
            res.status(400).send({
                error: `User already registred with this ${mobile && item ? "mobile and email" : item ? 'item' : 'mobile'} .`
            });
        } else {
            const user = req.body;
            const Password = await encodePassword(user.password);
            user.password = Password;
            req.body = user;
            insertRecord(req, res);
        }
    }
})

router.post('/updatepassword/', async (req, res) => {
    // Validate the user's old password and new password
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const user = await User.findOne({ email });
    const isPasswordCorrect = await decodePassword(oldPassword, user.password);
    if (!isPasswordCorrect) {
        res.status(400).send({ error: 'Incorrect password' });
        return;
    }

    const encodedPassword = await encodePassword(newPassword);
    await User.findOneAndUpdate(
        { email: req.body.email },
        {password: encodedPassword},
        { new: false },
    )
    // await User.findByIdAndUpdate(email, { password: encodedPassword });

    res.send({ message: 'Password updated successfully' });
});

router.post('/login/', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
        res.status(400).send({ error: 'User Not registred.' });
        return;
    }
    const isPasswordCorrect = await decodePassword(req.body.password, user.password);

    if (!isPasswordCorrect) {
        res.status(400).send({ error: 'Incorrect password' });
        return;
    }
    generateToken(req, res)
});

//for login token With v2
//router.post('/', (req, res) => { login_v2(req, res) });

module.exports = router