const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDb = require('./database/connectDb')
const fileUpload= require("express-fileupload")
const cookieParser = require('cookie-parser')
  


//image upload
app.use(fileUpload({useTempFiles:true}));
  //token get cookie
  app.use(cookieParser())

//view ejs set
app.set('view engine','ejs')
//css image js link public
app.use(express.static('public'))
// connectDb
connectDb()
//parse application/x-www-form-urlencodel
app.use(express.urlencoded({extended:false}))

//connect flash and session
const session = require('express-session')
const flash  = require("connect-flash")
//massage
app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false,
}));
// flash messages
app.use(flash());




// routes load
app.use('/', web)
// server create
app.listen(port,()=>{
    console.log(`Explain app lising on port ${port}`)
})
