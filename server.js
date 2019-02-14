const express = require("express");
const cookieParser = require("cookie-parser");
const {mainPage, accountRegistration} = require("./controllers/user.controller");
const {loginedPage} = require("./controllers/product.controllers");
const app = express();
const port = 3000;
const morgan = require('morgan');
const connect = require('./connect');
const url = "mongodb+srv://lukasimonishvili:Sr20ZiSciBWv6CI3@techhub-npn5x.mongodb.net/project?retryWrites=true";

app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", mainPage);
app.post("/", accountRegistration);

app.get("/logedin", loginedPage);

(async () => {
    try{
        await connect(url);
        app.listen(port, () => {
            console.log("server runs at http://localhost:3000");
        })
    }
    catch(err){
        console.error(err);
    }
})();