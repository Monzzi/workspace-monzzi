import React, { Component } from 'react';

const TableHeader = () => (
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Correo</th>
    </tr>
  </thead>
);

function TableBody(props) {
  const rows = props.peopleData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.nombre}</td>
        <td>{row.apellido}</td>
        <td>{row.correo}</td>
        <button onClick={() => props.removePeople(index)}>Borrar</button>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

class Table extends Component {
  render() {
    const { peopleData, removePeople, title } = this.props;
    return (
      <>
        <h1>{title}</h1>
        <table className="table-bordered">
          <TableHeader />
          <TableBody peopleData={peopleData} removePeople={removePeople} />
        </table>
        <br />
      </>
    );
  }
}

export default Table;
