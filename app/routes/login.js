const express = require("express")
const router = express.Router()

const loginController = require("../controllers/login")


//middleware list
// routes for views
router.get('/login', (req, res) => {
    //res.render('../views/index', {});
    const showRegisterButton = process.env.SHOW_REGISTER_BUTTON === 'true';
    console.log(`../views/login/login,showRegisterButton ->${showRegisterButton} `)
    res.render('../views/login/login',{showRegisterButton});
});

router.get('/register', (req, res) => {
    console.log("../views/login/register")
    res.render('../views/login/register');
  });

//routes for actions
router.post(
    `/login`,
    loginController.login
)
//register

router.post(
    `/register`,
    loginController.register
)

module.exports = router