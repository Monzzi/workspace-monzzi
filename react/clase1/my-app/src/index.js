import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  render () {
    return (
      <h1>
        ¡Hola mundo!
      </h1>
    );
  }
  upperFunction = (name) => String(name).toUpperCase();
  if (user) {
    return (
      <h1>
        ¡Hola {this.upperFunction(user)}!
      </h1>
    );
    return <h1>¡Hola Anónimo!</h1>;
  }
  render () {
    const name = 'montse pilo';
    return this.getGreeting(name);
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <App />
  </React.StrictMode>,
  document.getElementById('root')
);
