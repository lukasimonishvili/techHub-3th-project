const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const path = require("path");
const multer = require("multer");
const fileFilter = (req, file, cb) => {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
        cb(null, true);
    }else{
        cb(null, false)
    }
}
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname + "/public/uploads/"));
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});
const express = require("express");
const app = express();
const port = 3000;
const connect = require('./connect');
const url = "mongodb+srv://lukasimonishvili:Sr20ZiSciBWv6CI3@techhub-npn5x.mongodb.net/project?retryWrites=true";
const {mainPage, accountRegistration} = require("./controllers/user.controller");
const {loginedPage, manageProducts, addNewProduct} = require("./controllers/product.controllers");

app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", mainPage);
app.post("/", accountRegistration);

app.get("/user/:id", loginedPage);

app.get("/user/:id/MyProducts", manageProducts);
app.post("/user/:id/MyProducts", upload.single("picture"), addNewProduct);

(async () => {
    try{
        await connect(url);
            app.listen(port, () => {
            console.log("server runs at http://localhost:3000");
        });
    }
    catch(err){
        console.error(err);
    }
})();