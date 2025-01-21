const db = require('../models'); // forma abreviada de models/index.js

module.exports = {
  getAll() {
    return db.students.findAll();
  },
  insert (data) {
    return db.students.create(data);
  },

  // Ejercicio 1 clase 5. Añadir endpoint para get estudiante por id.
  getById(id) {
    return db.students.findByPk(id); // Encuentra el estudiante por su clave primaria (id)
},

  getByEmail(email) {
    return db.students.findOne({ where: { email: email } });
  },
};
