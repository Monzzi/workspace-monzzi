// Middlewares relacionados con autenticación y autorización

function isAuthenticated(req, res, next) {
  // verificar si la sessión del usuario existe
  if (req.session && req.session.isLoggedIn) {
    return next(); // si la sessión existe, continuar con la solicitud
  }

  // si la sessión no existe, redirigir al login
  res.redirect('/login');
}

function isAdmin(req, res, next) {
  // verificar si el usuario es del tipo "admin"
  if (req.session.user && req.session.user.type === 'admin') {
    return next(); // si el usuario es admin, continuar con la solicitud
  }

  // si el usuario no es admin, redirigir al inicio
  res.status(401).send('Acceso denegado');
}

module.exports = {
  isAuthenticated,
  isAdmin,
};
