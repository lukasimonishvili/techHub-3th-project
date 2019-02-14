const {User} = require("../models/user");

const getUserById = (id) => {
    return User.findById(id).exec();
}

const getAllUsers = () => {
    return User.find({}).exec();
}

const createUser = (user) => {
    return User.create(user)
}

const getUserByEmail = (info) => {
    return User.find({emai: info},(err, data) => {
        return data;
    });
}

// const updateUserById = (id, updateInfo) => {
//     return User.findByIdAndUpdate(id, updateInfo, { new: true }).exec();
// }
// const removeUserById = (id) => {
//     return User.findByIdAndDelete(id).exec();
// }

module.exports = {getUserById, getAllUsers, createUser, getUserByEmail}