import React, { Component } from "react";
import './Table.css';

// Componente funcional con arrow function
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Correo</th>
      </tr>
    </thead>
  );
};

// Componente funcional con función tradicional
function TableBody() {
  return (
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
}

// Componente de clase
class Table extends Component {
  render() {
    return (
      <table className="table-bordered">
        <TableHeader />
        <TableBody />
      </table>
    );
  }
}

export default Table;