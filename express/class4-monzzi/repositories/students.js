const db = require("./db");

module.exports = {
  getAll() {
    return db("students");
  },
  insert(data) {
    return db("students").insert(data);
  },
  deleteById(id) {
    return db("students").where({ id }).del();
  },

  // Ejercicio 1 clase 4. Añadir endpoint para get estudiante por id.
  getById(id) {
    return db("students").where({ id }).first(); // Retorna solo el primer resultado
  },
};
