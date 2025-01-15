// Middlewares incorporados: express.Router
const express = require("express");
let router = express.Router();

router.use((req, res, next) => { // La función se ejecuta cada vez que la aplicación recibe una solicitud.
  console.log("Time:", Date.now());
  next();
});
router.use("/:id", (req, res, next) => { // La función se ejecuta para cualquier tipo de solicitud HTTP en ruta /:id.
  console.log("Request Type:", req.method);
  next();
});
router.get("/:id", (req, res, next) => { // La función maneja las solicitudes GET a la ruta /:id.
  res.send("ID: " + req.params.id);
});

module.exports = router;
