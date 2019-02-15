const {User} = require("../models/user");
const {Product} = require("../models/product");

const loginedPage = (req,res) => {
    User.find({_id: req.params.id}, async (err, data) => {
        if(err){
            return console.error(err);
        }
        if(req.params.id !== req.cookies.user){
            return res.render("guest", {user: data[0]});
        }
        res.render("logedin", {user: data[0], logedIn: req.cookies.user});
    });
}

const manageProducts = (req,res) => {
    User.find({_id: req.cookies.user}, async (err, data) => {
        if(err){
            return console.error(err);
        }
        res.render("MyProducts", {user: data[0], logedIn: req.cookies.user});
    });

}

module.exports = {loginedPage, manageProducts}