import React from 'react';

function Welcome(props) {
  const { name } = props.name;
  return <h2 className='Welcome-message'>Hola {name}, bienvenid@ al curso de los Albañiles Digitales</h2>;
}

export default Welcome;