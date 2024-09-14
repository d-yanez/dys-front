const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');

//const loginController = require("../controllers/login")
const {SECRET_PASS_JWT} = process.env

//verificación de token
router.get('/dashboard', (req, res) => {
    console.log('[GET] /dashboard')
    const token = req.cookies.token;
    
    if (token) {
      console.log('token exists!!')
      jwt.verify(token, SECRET_PASS_JWT, (err, decoded) => {
        if (err) {
          res.redirect('/login');
          console.log('redirect -> login')
        } else {
            console.log('go to index to dashboard')
            res.render('../views/index');
        }
      });
    } else {
        console.log('redirect -> login')
        res.redirect('/login');
      
    }
    
});

module.exports = router
