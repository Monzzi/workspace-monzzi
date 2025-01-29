function MiBoton() {
  function handleClick() {
    alert('Has hecho click en el botón!');
}

  return <button onClick={handleClick}>Haz click aquí</button>
}

export default MiBoton;