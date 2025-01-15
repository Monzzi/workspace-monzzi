const express = require('express'); // Se carga el módulo de Express
const app = express(); // Creo la aplicación Express
const task_router = require('./routes/task'); // Cargo el módulo router task
const book_router = require('./routes/book'); // Cargo el módulo router book
const port = 3000; // Declaro el puerto de escucha
const cookkieParser = require('cookie-parser'); // Cargo el módulo cookie-parser

// La función callback recibe una petición y una respuesta como argumentos
app.get('/', (req, res) => { // Defino la ruta que se llamará cuando se reciba una petición HTTP GET en la dirección '/'
  res.set('Content-Type', 'text/plain'); // Se define la cabecera HTTP con el tipo de contenido
  res.status(200).send('Hello World!!'); // Se responde, en el cuerpo de la respuesta con el mensaje "Hello World!!"
});

app.use((req, res, next) => { // La función se ejecuta cada vez que la aplicación recibe una solicitud.
  console.log('Time:', Date.now());
  next();
});

app.use('/user/:id', (req, res, next) => { // La función se ejecuta para cualquier tipo de solicitud HTTP en ruta /user/:id.
  console.log('Request Type:', req.method);
  next();
});

 app.use('/user/:id', // subpila de middleware que imprime información de solicitud para cualquier tipo de solicitud HTTP en la ruta /user/:id.
  (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log('Request Type subpila:',
  req.method);
    next();
  }
);

app.get('/user/:id', (req, res, next) => { // La función maneja las solicitudes GET a la ruta /user/:id.)
  res.send('USER ID: ' + req.params.id);
 });

app.get('/student/:id',
  (req, res, next) => {
    if (isNaN(Number(req.params.id))) throw new Error('Student ID inválido, introduzca un número'); // Si el student ID no es un número, se lanza un error
    if (req.params.id > 99) next(Error('Student ID no puede ser mayor de 99')); // Si el student ID es mayor de 99, se lanza un error
   // if (req.params.id >= 1) next('route'); lo comento porque no lo veo necesario pueto que sería el else next
    if (req.params.id == 0) next('route'); // Si id es 0 salta a la route.

    else next();
  },
  (req, res, next) => {
    res.send('Estudiante regular'); // renderiza una página de estudiante regular.
  }
);

app.get('/student/:id', (req, res, next) => { //Esta es la siguiente ruta establecida.
  res.send('Estudiante especial');  // Si el estudiante ID es 0, se renderiza una página de estudiante especial.
  next();
});

// Middlewares incorporados
app.use('/static', express.static(__dirname + '/public')); // Servir archivos estáticos desde la carpeta public
// Cómo? http://localhost:3000/static/hello.html



app.use(express.json()); // Declaro los middlewares que quiero usar
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

app.post('/user', (req, res, next) => {
  console.log(typeof req.body, req.body);
  console.log('El title es: ', typeof req.body.title);
  res.send(req.body.title); // cambio end por send es más amigable y funcional (fuente chatgpt)
  next();
});

/* Para probar tenemos que lanzar los curls siguientes por ejemplo:
curl -v -POST http://localhost:3000/user -H "content-type:application/json" -d '{"title": "Express json"}'
curl -v -POST http://localhost:3000/user -H "content-type:text/plain" -d '{"title": "Express text"}'
curl -v -POST http://localhost:3000/user -H "content-type:application/x-www-form-urlencoded" --data-urlencode 'title=Express urlencode'
*/


// Middleware incorporados. En el archivo task.js están los middlewares incorporados (peticiones)
app.use('/task', task_router); // Cargo el router de task de mi aplicación.

// Refactorización de los middlewares de /book con Router
app.use('/book', book_router);

// Middlewares de terceros
app.use(cookkieParser()); // Carga la función cookie-parser

app.get('/cookie', (req, res) => { // Ruta para asignar una cookie
  res.cookie('customCookies', 'cookie Value').send('Cookie is now set');
});

app.get('/check-cookie', (req, res) => { // Ruta para obtener las cookies
  console.log('Las Cookies son: ', req.cookies); // Se muestran las cookies por consola del backend
  res.send('Las Cookies son: ' + req.cookies.customCookies); // Lo añado yo, Monzzi, para ver si para la ejecución.
});

// Middlewares de manejo de errores
app.use ((err, req, res, next) => { // Middleware de manejo de errores
  console.error(err.stack);
  res.status(500).send('Algo ha fallado!: ' + err.message);
});

// Creo el servidor
app.listen(port, () => { // Creo el servidor en el puerto ${port}
  console.log(`Example server listening on http://localhost:${port}`); // Se escribe la URL para el acceso al servidor
});