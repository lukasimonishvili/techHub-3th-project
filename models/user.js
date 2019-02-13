const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ["person", "company"]
    },
    companyName: {
        type: String,
        unique: true,
    },
    IC: {
        type: Number,
        unique: true
    }
}, { timestamps: true});

UserSchema.methods.checkPassword = (password) => {
    const passwordHash = this.password;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (error, result) => {
            if(error) {
                reject(error);
            }else{
                resolve(result);
            }
        });
    });
}

let findByemail = (info) => {
    return mongoose.model('user', UserSchema).find({email: info}, (err, data) => {
        console.log(data)
    })
}
const User = mongoose.model('user', UserSchema);
module.exports = {User, findByemail}