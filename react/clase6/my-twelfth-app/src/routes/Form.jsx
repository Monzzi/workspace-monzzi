import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  initialState = {
    nombre: '',
    apellido: '',
    correo: '',
  };
  state = this.initialState;
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };
  render() {
    const { nombre, apellido, correo } = this.state;
    return (
      <form>
        <labbel htmlFor="nombre">Nombre</labbel>
        <input
          type="text"
          name="nombre"
          value={nombre}
          onChange={this.handleChange}
        />
        <labbel htmlFor="apellido">Apellido</labbel>
        <input
          type="text"
          name="apellido"
          value={apellido}
          onChange={this.handleChange}
        />
        <labbel htmlFor="correo">Correo</labbel>
        <input
          type="text"
          name="correo"
          value={correo}
          onChange={this.handleChange}
        />
        <input type="button" value="Enviar" onClick={this.submitForm} />
      </form>
    );
  }
}

export default Form;
