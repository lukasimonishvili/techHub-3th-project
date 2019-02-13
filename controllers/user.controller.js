const cruds = require("../cruds/userCruds");
const {User, findByemail} = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 15;

let userErrors = [];
let companyErrors = [];

const mainPage = (req,res) => {
    res.render("index", {userErrors: userErrors, companyErrors: companyErrors});
}

const accountRegistration= (req,res) => {
    switch(req.body.method){
        case "preg":
            if(req.body.mobile.length !== 9){
                userErrors.unshift("Enter correct mobile number");
                return res.redirect("/");
            }
            if(req.body.password !== req.body.repassword){
                userErrors.unshift("Passwords do not match each other");
                return res.redirect("/");
            }
            if(req.body.password.length < 6){
                userErrors.unshift("Password should contain min. 6 symbols");
                return res.redirect("/");
            }
            User.find({email: req.body.email}, (err,data) => {
                if(data.length == 0){
                    let checkList = /@/
                    let validResult = checkList.test(req.body.email);
                    if(!validResult){
                        userErrors.unshift("Please enter valid email");
                        return res.redirect("/");
                    }
                    bcrypt.hash(req.body.password, saltRounds).then(async function(hash) {
                        const userDetails = {
                            name: req.body.name,
                            lastname: req.body.lastname,
                            mobile: req.body.mobile,
                            email: req.body.email,
                            password: req.body.password,
                            userType: req.body.type
                        };
                        userDetails.password = hash;
                        const newUser = await cruds.createUser(userDetails);
                    });
                    userErrors = []
                    res.redirect("/"); 
                }else{
                    userErrors.unshift("User with same email already exists");
                    return res.redirect("/");
                }
            }); 
            break;
        case "creg": 
            if(req.body.mobile.length !== 9){
                companyErrors.unshift("Enter correct mobile number");
                return res.redirect("/");
            }
            if(req.body.password !== req.body.repassword){
                companyErrors.unshift("Passwords do not match each other");
                return res.redirect("/");
            }
            if(req.body.password.length < 6){
                companyErrors.unshift("Password should contain min. 6 symbols");
                return res.redirect("/");
            }
            User.find({email: req.body.email}, (err,data) => {
                if(data.length == 0){
                    let checkList = /@/
                    let validResult = checkList.test(req.body.email);
                    if(!validResult){
                        companyErrors.unshift("Please enter valid email");
                        return res.redirect("/");
                    }
                    User.find({companyName: req.body.company}, (error, company) => {
                        if(company.length > 0){
                            companyErrors.unshift("That company already registred");
                            return res.redirect("/");
                        }else{
                            User.find({IC: req.body.idcode}, (erro, IC) => {
                                if(IC.length > 0){
                                    companyErrors.unshift("Check your company identification code");
                                    return res.redirect("/");
                                }else{
                                    bcrypt.hash(req.body.password, saltRounds).then(async function(hash) {
                                        const userDetails = {
                                            name: req.body.name,
                                            lastname: req.body.lastname,
                                            mobile: req.body.mobile,
                                            email: req.body.email,
                                            password: req.body.password,
                                            userType: req.body.type,
                                            companyName: req.body.company,
                                            IC: req.body.idcode
                                        };
                                        userDetails.password = hash;
                                        const newUser = await cruds.createUser(userDetails);
                                    });
                                    companyErrors = []
                                    res.redirect("/"); 
                                }
                            });
                        }
                    });
                }else{
                    companyErrors.unshift("User with same email already exists");
                    return res.redirect("/");
                }
            }); 
            break;
    }
}

module.exports = {mainPage, accountRegistration}