import React, { Component } from "react";
import "./Table.css";

// Encabezado de la tabla
const TableHeader = () => (
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Correo</th>
    </tr>
  </thead>
);

// Cuerpo de la tabla con datos estáticos
const TableBody = () => (
  <tbody>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>0qGjB@example.com</td>
    </tr>
    <tr>
      <td>Paty</td>
      <td>Doel</td>
      <td>patyB@example.com</td>
    </tr>
  </tbody>
);

class Table2 extends Component {
  render() {
    return (
      <table className="table-bordered">
        <TableHeader />
        <TableBody />
      </table>
    );
  }
}

export default Table2;
