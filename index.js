const express = require('express')
const connectDB = require('./config/db')
const passport=require('passport')
const cors = require('cors')
const authRoutes = require('./routes/authroute')
const passportSetup=require('./config/passportsetup')
//Fb passport setup
const passportSetupFB=require('./config/passportsetupFB');
const cookieSession= require('cookie-session');
const app= express();
require('dotenv').config()
app.use(cors())
connectDB();

// define middleware
app.use(express.json({extended:false}));

app.use(cookieSession({
    maxAge:24*60*60*1000 ,
    keys:[`${process.env.COOKIEKEY}`]
}))


//initialize passport
// initialize passport
app.use(passport.initialize());
app.use(passport.session());


//define routes
app.use('/auth',authRoutes);

app.get('/',(req,res)=>{
    res.send('welcome to home page');
})



// setup static files


//setup server
const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=>{
    console.log(`server started on port ${PORT}`)
})