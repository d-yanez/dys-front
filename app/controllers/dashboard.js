
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const {SECRET_PASS_JWT} = process.env

//login
exports.dashboard = async (req, res) => {
    
    //get token by refresh token
    console.log("controller.login - inicio")
    const { username, password } = req.body;
    const user = await User.findOne({ username: username, password: md5(password) });
  
    if (user) {
      const token = jwt.sign({ username: user.username }, SECRET_PASS_JWT, { expiresIn: '1h' });
      res.cookie('token', token);
      res.redirect('/dashboard');
    } else {
      res.send('Usuario o contraseña incorrectos');
    }
    
}
//register user
exports.register = async (req, res) => {
    
    //get token by refresh token
    console.log("controller.register - inicio")
    const newUser = new User({
        username: req.body.username,
        password: md5(req.body.password) // Encriptar la contraseña
      });
      newUser.save((err) => {
        if (!err) {
          res.send('Usuario registrado exitosamente');
        } else {
          res.send(err);
        }
      });
    
}