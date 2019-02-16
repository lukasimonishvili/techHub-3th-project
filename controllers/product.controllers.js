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
        Product.find({author: req.cookies.user}, async (erro, productList) => {
            if(err){
                return console.error(erro);
            }
            res.render("MyProducts", {user: data[0], logedIn: req.cookies.user, myProductes: productList});
        })
    });

}


const addNewProduct = async (req,res) => {
    console.log(req.file);
    console.log({...req.body});
    await Product.create({
        name: req.body.name,
        price: req.body.price + "$",
        amount: req.body.amount,
        author: req.body.author,
        contact: req.body.contact,
        picture: req.file.filename,
        description: req.body.description
    });
    res.redirect(`/user/${req.cookies.user}/MyProducts`);
}
module.exports = {loginedPage, manageProducts, addNewProduct}