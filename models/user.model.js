const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const bcrypt = require('bcryptjs');
const env = require('dotenv')
env.config()

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecretKey";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: 3,
        maxlength: 20
    },
    mobile: {
        type: Number,
        required: [true, 'Mobile number is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^[\w-\.]+@[\w-]+\.[a-zA-Z]{2,7}$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password amount is required'],
    }
});

const User = mongoose.model('User', UserSchema);

// Encrypt data
const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, JWT_SECRET).toString();
};

// Decrypt data
const decrypt = (data) => {
    return CryptoJS.AES.decrypt(data, JWT_SECRET).toString(CryptoJS.enc.Utf8);
};

// Encode password
const encodePassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const encodedPassword = await bcrypt.hash(password, salt);
    return encodedPassword;
};

// Decode password
const decodePassword = async (password, encodedPassword) => {
    const isPasswordCorrect = await bcrypt.compare(password, encodedPassword);
    return isPasswordCorrect;
};


module.exports = {
    User,
    encrypt,
    decrypt,
    encodePassword,
    decodePassword
};