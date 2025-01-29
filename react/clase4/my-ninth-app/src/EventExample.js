import React from 'react';

// class EventExample extends React.Component { // Diapsotiva 5. método no recomendable. uso bind
//   constructor(props) {
//     super(props);
//     this.manejadorClick = this.manejadorClick.bind(this);
//     this.metodoDeClase = this.metodoDeClase.bind(this); // agregamos esto para que funcione y no salga undefined.
//   }
//   manejadorClick() {
//     console.log("This is: ", this);
//   }
//   campoPublico = () => {
//     console.log("This is: ", this);
//   };
//   metodoDeClase() {
//     console.log("This is: ", this);
//   }
//   render() {
//     return (
//       <>
//       <button onClick={this.manejadorClick}>
//         Manejador ligado con bind
//         </button>
//       <button onClick={this.campoPublico}>
//         Manejador con campo publico
//         </button>
//       <button onClick={this.metodoDeClase}>
//         Manejador de método clase
//         </button>
//       </>
//     );
//   }
// }

// class EventExample extends React.Component { // diapo 6 primer bloque
//   deleteRow = (id, e) => {
//     console.log(e, id);
//   };
//   render() {
//     const id = 10;
//     return (
//       <>
//         <button onClick={(e) => this.deleteRow(id, e)}>
//           Eliminar con función flecha
//         </button>
//       </>
//     );
//   }
// }

// class EventExample extends React.Component { // diapo 6 segundo bloque
// deleteRow = (id, e) => {
//   console.log(e, id);
// };
// render() {
//   const id = 10;
//   return (
//     <>
//       <button onClick={this.deleteRow.bind(this, id)}>
//         Eliminar con bind
//       </button>
//     </>
//   );
// }
// }

// Ejercicio 1 punto 1. ninth-app
class EventExample extends React.Component {
  constructor(props) {
    super(props);
    this.manejadorClick = this.manejadorClick.bind(this);
    this.metodoDeClase = this.metodoDeClase.bind(this);
  }

  // Evento onClick con bind
  manejadorClick() {
    console.log("This is: ", this);
  }

  // Evento onClick con función flecha (recomendado)
  campoPublico = () => {
    console.log("This is: ", this);
  };

  // Evento sin bind (esto dará undefined si no lo corregimos)
  metodoDeClase() {
    console.log("This is: ", this);
  }

  // Evento con argumentos (deleteRow)
  deleteRow = (id, e) => {
    console.log("Eliminar fila:", id);
    console.log("Evento:", e);
  };

  render() {
    const id = 10;
    return (
      <>
        <h2>Ejemplo de Eventos en React</h2>

        {/* Evento onClick con bind */}
        <button onClick={this.manejadorClick}>
          Manejador ligado con bind
        </button>

        {/* Evento con función flecha */}
        <button onClick={this.campoPublico}>
          Manejador con campo público
        </button>

        {/* Evento sin bind (originalmente undefined) */}
        <button onClick={this.metodoDeClase}>
          Manejador de método clase
        </button>

        {/* Evento onClick con argumentos - función flecha */}
        <button onClick={(e) => this.deleteRow(id, e)}>
          Eliminar con función flecha
        </button>

        {/* Evento onClick con bind y argumentos */}
        <button onClick={this.deleteRow.bind(this, id)}>
          Eliminar con bind
        </button>
      </>
    );
  }
}

export default EventExample;
