
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const md5 = require('md5');

const {SECRET_PASS_JWT} = process.env

//login
exports.login = async (req, res) => {
    
    //get token by refresh token
    console.log("[controller.login] - inicio")
    const { username, password } = req.body;
    const user = await User.findOne({ username: username, password: md5(password) });
  
    if (user) {
      const token = jwt.sign({ username: user.username }, SECRET_PASS_JWT, { expiresIn: '1h' });
      console.log("[controller.login] - set token and redirect to dashboard (index)")
      res.cookie('token', token);
      res.redirect('/dashboard');
    } else {
      //res.send('Usuario o contraseña incorrectos');
      console.log("[controller.login] - Usuario o contraseña incorrectos")
      //res.render('login', { loginSuccess: false });
      res.render('../views/login/login', { loginSuccess: false });
    }
    
}
//register user
exports.register = async (req, res) => {
    console.log("[controller.register] - inicio")
    console.log(`[controller.register] - user:${req.body.username}`)

    try {
        const newUser = new User({
          username: req.body.username,
          password: md5(req.body.password) // Encriptar la contraseña con MD5
        });
    
        await newUser.save(); // Guardar el nuevo usuario en la base de datos
        console.log("[controller.register] - user created success!!")
        res.redirect('/login'); // Redirigir al login después de registrar exitosamente
      } catch (err) {
        console.error('[controller.register]Error:', err);
        res.status(500).send('Error al registrar usuario');
      }
    
}