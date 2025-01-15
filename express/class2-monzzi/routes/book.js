const express = require('express');
let router = express.Router();

router.get('/:id',
  (req, res, next) => { // La función maneja las solicitudes GET a la ruta /book/:id.
    console.log('BOOK ID:', req.params.id);
    next ();
  },
  (req, res, next) => {
    res.send('Book info');  // para aquí porque el res.send es un indicador de finalización del middleware
    next();
  });

// router.get('/:id', (req, res, next) => { // función que intenta imprimir el book ID, pero que nunca se ejecutará, se ha cortado el control del middleware antes.
//   res.end(req.params.id);
// });
// Comento lo anterior para que no de error. App crashed


module.exports = router;
