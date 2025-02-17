// Middleware para verificar si el usuario está autenticado.
function isAuthenticated(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next(); // Si la sesión del usuario está activa
  }

  // Si no hay sesión, redirigir al login
  res.redirect('/login');
}

// Middleware para verificar si el usuario es administrador.
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
