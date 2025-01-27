import React from "react";
import Table from "./Table";



class App extends React.Component {
  render () {
    const people = [
      { nombre: "Fernando", apellido: "Perez", correo: "Fernando@Perez.com" },
      { nombre: "Gema", apellido: "Pamundi", correo: "gmpamundi@gmail.com" },
      { nombre: "Aitor", apellido: "Tilla", correo: "ailla@example.com" },
      { nombre: "Monzzi", apellido: "Pilo", correo: "pilito@example.com" },
      { nombre: "Viceroy", apellido: "Merlin", correo: "vrm@example.com" },
    ];
    const title = "Very nice people";
    return (
      <>
      <h1>My Fifth App. Hello World!!</h1>
      <div className="container">
        <Table peopleData={people} title={title} /> {/* Tabla con datos dinamicos. */}
      </div>
      </>
    );
  }
}


export default App;


