import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Clase 2 diapo 4.
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
// const helloWorld = <h1>Hello, world!</h1>;
// root.render(helloWorld);

// Clase 2 diapo 5. Ejercicio 1.
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);




reportWebVitals(); // for reports in the console reportWebVitals(console.log);
