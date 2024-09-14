const express = require("express");
const bodyParse = require("body-parser");
const cookieParser = require('cookie-parser'); // Requerir cookie-parser
//const mongoose = require('mongoose');
//const md5 = require('md5');
//const jwt = require('jsonwebtoken');
const initDB = require('./config/db')

const app = express();
const PORT = process.env.PORT || 2976;

//middleware
app.use(bodyParse.urlencoded({extends:true}));
app.use(bodyParse.json());
app.use(cookieParser()); // Usar cookie-parser

app.set('views','./views');
app.set('view engine','pug');
// Sirve archivos estáticos
const path = require('path');
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


//routes

const loginRoute = require('./app/routes/login')
const loginDashboard = require('./app/routes/dashboard')

//register router server app

app.use(loginRoute)
app.use(loginDashboard)

//page
/*app.get("/",async (req,res) =>{
    res.render('../views/index', {});
});*/

//run server
app.listen(PORT,() =>{
    console.log(`Tu server esta listo en el puerto->${PORT}`)
});
//connected to db
initDB();
