const {User} = require("../models/user");

const loginedPage = (req,res) => {
    User.find({_id: req.params.id}, async (err, data) => {
        if(err){
            return console.error(err)
        }
        await console.log(data);
        res.render("logedin", {user: data[0]});
    });
}

module.exports = {loginedPage}