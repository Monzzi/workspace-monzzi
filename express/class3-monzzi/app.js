const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');

const app = express();

const port = 3000;

// Método res.download: Ruta para descargar un archivo
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'manual.pdf');

  res.download(filePath, 'manual_de_usuario.pdf', (err) => {
    if (err) {
      console.error('Error al descargar el archivo:', err);
      res.status(500).send('Hubo un error al intentar descargar el archivo.');
    } else {
      console.log('Archivo descargado con éxito.');
    }
  });
});

// Método res.json: Ruta que envía un objeto JSON
app.get('/user', (req, res) => {
  const user = {
    id: 1,
    name: 'Monzzi',
    email: 'Monzzi@dmonzzidev.com',
    active: true
  };
  res.json(user);
});

// Ruta que envía un mensaje de error con código de estado
app.get('/error', (req, res) => {
  res.status(500).json({ error: 'Algo salió mal en el servidor.' });
});

// Método res.redirect: Ruta que redirecciona a otra ruta
app.get('/redirect', (req, res) => {
  res.redirect('/user');
});

// Redirección permanente
app.get('/permanent-redirect', (req, res) => {
  res.redirect(301, 'http://example.com/new-location');
});

// Redirección al referer o a "/"
app.get('/back', (req, res) => {
  res.redirect('back');
});

// Método res.render.
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// renderización con el motor mustache
app.get('/', (req, res) => {
  res.render('index');
});

// renderización con callback NO LO ENTIENDO EXPLICACIÓN
app.get('/', (req, res) => {
 // res.render('index');
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// Métod res.sendStatus
// Ruta con 200 OK
app.get('/ok', (req, res) => {
  res.sendStatus(200); // Responde con "OK"
});

// Ruta con 404 Not Found
app.get('/not-found', (req, res) => {
  res.sendStatus(404); // Responde con "Not Found"
});

// Ruta con 500 Internal Server Error
app.get('/error', (req, res) => {
  res.sendStatus(500); // Responde con "Internal Server Error"
});

// Ruta con código desconocido
app.get('/custom', (req, res) => {
  res.sendStatus(999); // Responde con "999"
});


// EJERCICIO 2. Código ejemplo. No logro averiguar de donde sacarlo.
// Ruta para manejar /book/:id y revisar las propiedades del objeto request
app.get('/book/:id', (req, res) => {
  console.log('req.params:', req.params); // { id: '123' }
  console.log('req.route:', req.route); // Información de la ruta
  console.log('req.hostname:', req.hostname); // Nombre del host
  console.log('req.ip:', req.ip); // Dirección IP del cliente

  res.send('Book info');
});

  // Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
