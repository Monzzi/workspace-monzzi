const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');


app.use(cookieParser('ClaverSuperSecreta'));
// Ruta para asignar las cookies
app.get('/cookies/set', (req, res) => {
  const date = new Date();
  date.setHours(date.getHours() + 5);

  res.cookie('customCookie', 'Cookie Value', {
    secure: false,
    httpOnly: true,
    expires: date,
    sameSite: 'strict',
  });
  res.cookie('customSignedCookie', 'Cookie value signed', {
    signed: true,
    httpOnly: true,
    expires: date,
    sameSite: 'strict',
  });

  res.send('Cookies set!');
});

// Ruta para obtener los valores de las cookies
app.get('/cookies', (req, res) => {
  // cookies que no han sido firmadas
  console.log('Cookies:', req.cookies);
  // cookies firmadas
  console.log('Signed Cookies:', req.signedCookies);
  res.json({
    customCookie: req.cookies.customCookie,
    customSignedCookie: req.signedCookies.customSignedCookie,
  });
});
// Ruta protegida, necesita que la variable haya sido configurada
app.get('/protected', (req, res) => {
  if (req.cookies.customCookie) {
    res.send('Cookie has been set!');
  } else {
    res.send('The cookie doesn\'t exist!');
  }
});

// Ruta para eliminar las cookies
app.get('/cookies/delete', (req, res) => {
  res.clearCookie('customCookie');
  res.clearCookie('customSignedCookie');
  res.send('Cookies removed!');

});

// Sessions.
app.use(session({
  secret: 'ClaverUltraSecreta',
  resave: false,
  saveUninitialized: false,
}));
// Ruta para asignar una session
app.get('/sessions/set', (req, res) => {
  req.session.isSessionSet = true;
  res.send('Session set!');
});
// Ruta para obtener los valores de la session
app.get('/sessions', (req, res) => {
  console.log('Sessions:', req.session);
  // Cookies firmadas
  res.json({
    isSessionSet: req.session.isSessionSet,
  });
});
// Ruta protegida necesita que la variable haya sido configurada
app.get('/protected-by-session', (req, res) => {
  if (req.session.isSessionSet) {
    res.send('IsSessionSet has been set!');
  } else {
    res.send('The session variable doesn\'t exist!');
  }
});
// Ruta para eliminar la variable de la session
app.get('/sessions/delete', (req, res) => {
  delete req.session.isSessionSet;
  res.send('Session variable removed!');
});

// JWT
// Declaramos una clave para firmar el token y verificarlo y creamos ruta para obtener el token
const JTW_SECRET = 'ClaveUltraSecreta';
app.get('/jwt/set', (req, res) => {
  const token = jwt.sign({ data: 'jwt value' },
    JTW_SECRET, {
      expiresIn: '5m',
    });
    res.json({ token: token });
  });

  // Middleware para obtener el data de JWT
  const isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: 'Authorization header missing',
      });
  }

  let authorization = req.headers.authorization;
  let token = authorization.split(' ')[1];
  let jwtdata;
  try {
    jwtdata = jwt.verify(token, JTW_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
  req.data = jwtdata.data;
  next();
  };

  // Ruta para obtener el data de JWT si es válido
  app.get('/jwt', isAuth, (req, res) => {
    res.json({ data: req.data });
  });

  // curl -XGET http://localhost:3000/jwt -H "Authorization: Bearer ${JWT_TOKEN}"



// Creo el servidor
app.listen(port, () => {
  console.log(`Example server listening on http://localhost:${port}`);
});
