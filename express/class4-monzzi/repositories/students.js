const db = require("./db");

module.exports = {
  getAll() {
    return db("students");
  },
  insert(data) {
    return db("students").insert(data);
  },
};
