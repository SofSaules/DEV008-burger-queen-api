const jwt = require('jsonwebtoken');

module.exports = (secret) => (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, async (err, decodedToken) => {
    if (err) {
      return next(403);
    }

    // TODO: Verificar identidad del usuario usando `decodedToken.uid`

    req.userId = decodedToken.userId; // Agregar el ID del usuario al objeto `req`
    req.userRole = decodedToken.role
    req.userEmail = decodedToken.email;
    req.isAuthenticated = true;

    next(); // Continua con siguiente middleware
  });
};


module.exports.isAuthenticated = (req) => (!!req.isAuthenticated);


module.exports.isAdmin = (req) => req.userRole === 'admin';

module.exports.requireAuth = (req, res, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, res, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
