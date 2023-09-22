const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const usersModel = require('../models-MongoDB/usersModel');

const { secret } = config;
/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(400);
    }
    try {
      const user = await usersModel.User.findOne({ email });
      if (!user) {
        throw 'Email dows not exists';
      }
      // console.log("uno", password)
      // console.log("dos", user.password)
      if (!bcrypt.compareSync(password, user.password)) {
        throw 'Incorrect password';
      }
      console.log('Usuario autenticado: ', user);
      console.log('Ingresaste satisfactoriamente');

      // Generar el token JWT
      const token = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: '1h' });
  
      // Envía el token como respuesta
      res.status(200).json({ token });

    } catch (error) {
      console.error('Error de autenticación:', error);
      return next(400);
    }

    // TODO: autenticar a la usuarix
    // Hay que confirmar si el email y password
    // coinciden con un user en la base de datos
    // Si coinciden, manda un access token creado con jwt
    next();
  });
  return nextMain();
};
