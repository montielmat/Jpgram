const express= require("express");
const app = express();
const path = require ('path');
const morgan = require ('morgan');
const {format} =require("timeago.js");

// const multer = require("multer");
const uploadRouter = require("./routes/routes");
const cors = require("cors");

require("./db");
// const upload = multer({
//     storage,
//     limits: {fileSize: 300000},
//     dest : path.join(__dirname,'public/uploads')
//     }).single('file_inp')
//CONIFIG
const port=process.env.PORT || 3100

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

//MIDDLEWARES
app.use(cors())
app.use(morgan())
app.use(express.json());

app.use(express.urlencoded({extended:false}))

//GLOBAL VARIABLES
app.use((req,res,next)=>{
    app.locals.format=format
    next();
})
//ROUTES
app.use('/',uploadRouter)

//statics
app.use(express.static(path.join(__dirname,'public')))

//STARTING THE SERVER
app.listen(port,()=>{
    console.log(`Server running 🤖 on --> http://localhost:${port}`)
})

