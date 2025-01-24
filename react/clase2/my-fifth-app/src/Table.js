import React, { Component } from "react";
import './Table.css';

// Para my-fifth-app.


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

// Cuerpo de la tabla con datos dinámicos. Descomentar para diapo 8.
// const TableBody = ({ peopleData }) => (
//   <tbody>
//     {peopleData.map((person, index) => (
//       <tr key={index}>
//         <td>{person.nombre}</td>
//         <td>{person.apellido}</td>
//         <td>{person.correo}</td>
//       </tr>
//     ))}
//   </tbody>
// );

// Cambios de la dipo 9. Añadir props

function TableBody (props) {
  const rows = props.peopleData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.nombre}</td>
        <td>{row.apellido}</td>
        <td>{row.correo}</td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>
  }



class Table extends Component {
  render() {
    const { peopleData, title } = this.props;
    return (
      <>
      <h1>{title}</h1>
      <table className="table-bordered">
        <TableHeader />
        <TableBody peopleData={peopleData} />
      </table>
      <br />
      </>
    );
  }
}

export default Table;
