const User = require("../models/User");
const { ReturnWithData } = require("../utils/response");


const UserController = (router) => {


    router.route('/getAll').get(async (req, res, next) => {
        const users = await User.find();
        console.log(users);
        var allUsers = users.map((user) => {
            return {
                name: user.name,
                about: user.about,
                mobile: user.mobile,
                profile: user.profile,
            }
        })



        res.json(
            ReturnWithData(allUsers)
        )
    })
}

module.exports = UserController;