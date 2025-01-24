// Middlewares relacionados con autenticación y autorización

/**
 * Middleware para verificar si el usuario está autenticado.
 * Si la sesión existe, permite continuar; de lo contrario, redirige al login.
 */
function isAuthenticated(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next(); // Si la sesión del usuario está activa
  }

  // Si no hay sesión, redirigir al login
  res.redirect('/login');
}

/**
 * Middleware para verificar si el usuario es administrador.
 * Si el usuario es de tipo 'admin', permite continuar.
 * Si el usuario es de otro tipo (por ejemplo, 'user'), lo redirige a su perfil en /home.
 */
function isAdmin(req, res, next) {
  if (req.session.user) {
    if (req.session.user.type === 'admin') {
      return next(); // Si el usuario tiene permisos de administrador
    }
    // Si el usuario es de otro tipo, redirigir a su perfil
    return res.redirect('/home');
  }
}

module.exports = {
  isAuthenticated,
  isAdmin,
};
