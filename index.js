const express = require("express");
const bodyParse = require("body-parser");

const app = express();
const PORT = process.env.PORT || 2976;

app.use(bodyParse.urlencoded({extends:true}));
app.use(bodyParse.json());

app.set('views','./views');
app.set('view engine','pug');
// Sirve archivos estáticos
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


//page
app.get("/",async (req,res) =>{
    res.render('../views/index', {});
  });

app.listen(PORT,() =>{
    console.log(`Tu server esta listo en el puerto->${PORT}`)
});
