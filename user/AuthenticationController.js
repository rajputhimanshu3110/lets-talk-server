const bcrypt = require('bcryptjs');
const response = require('../utils/response');
const User = require('../models/User');
const jwt = require("jsonwebtoken");

const { ReturnServerError, ReturnfalseMessage, ReturnWithData } = response;

const AuthenticationController = (router) => {

    router.route('/register').post(async (req, res, next) => {
        const { name, about, password, email, mobile, role } = req.body;
        console.log(req.body)
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err)
                    res.json(ReturnServerError());

                const RegisterUser = await User.create({
                    name,
                    about, mobile, password: hash, email, role
                });

                token = jwt.sign(
                    {
                        email: email,
                        password: password,
                    },
                    process.env.PRIVATE_KEY
                );
                const data = {
                    token: token, user: { id: RegisterUser._id, name: RegisterUser.name, email: RegisterUser.email, about: RegisterUser.about, profile: RegisterUser.profile, mobile: RegisterUser.mobile }
                };

                res.json(ReturnWithData(data, 'User Registered Succesfully'));

            });
        });
    })


    router.route('/login').post(async (req, res, next) => {
        const { password, email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) res.status(500);
                if (isMatch) {
                    try {
                        token = jwt.sign(
                            {
                                email: email,
                                password: password,
                            },
                            process.env.PRIVATE_KEY
                        );
                        const data = {
                            token: token, user: { id: user._id, name: user.name, email: user.email, about: user.about, profile: user.profile, mobile: user.mobile }
                        };
                        res.json(ReturnWithData(data, 'User Logged in'));
                    } catch (err) {
                        res.json(ReturnServerError());
                    }
                } else {
                    res.json(ReturnfalseMessage('Password Not Matched'));
                }
            });
        } else {
            res.json(ReturnfalseMessage("User Not found"));
        }
    })

}

module.exports = AuthenticationController;