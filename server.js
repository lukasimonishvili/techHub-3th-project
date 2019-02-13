const express = require("express");
const {mainPage, accountRegistration} = require("./controllers/user.controller");
const app = express();
const port = 3000;
const morgan = require('morgan');
const connect = require('./connect');
const url = "mongodb+srv://lukasimonishvili:Sr20ZiSciBWv6CI3@techhub-npn5x.mongodb.net/project?retryWrites=true";

app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", mainPage);
app.post("/", accountRegistration);


connect(url);

app.listen(port, () => {
    console.log("server runs at http://localhost:3000");
});