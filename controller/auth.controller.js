const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('user');

const register = (req, res) => {
    const { nickname, fullName, email, password, dob, country } = req.body;
    if( !nickname || !fullName || !email || !password || !dob || !country) {
        return res.json({ message: 'please add all the fields' })
    }
    User.findOne({ email: email })
        .then((insertedUser) => {
            if(insertedUser) {
                return res.json({ message: 'user already exists with this email.' })
            }
            bcrypt.hash(password, 14)
                .then((bcryptPassword) => {
                    const user = new User({
                        nickname,
                        fullName,
                        email,
                        password: bcryptPassword,
                        dob,
                        country
                    })
                    user.save()
                        .then((savedUser) => {
                            return res.status(201).json({ savedUser })
                        }, (error) => {
                            return res.status(401).json({ error })
                        })
                })
        })
        .catch((error) => console.log(error))
}

const login = (req, res) => {}

module.exports = {register, login}