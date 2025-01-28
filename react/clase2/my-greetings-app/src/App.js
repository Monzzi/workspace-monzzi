import React from 'react';
import Welcome from './Welcome';
import './App.css';

function App() {
  return (
    <div className="App">
      <Welcome name="Juan" /> 
      <Welcome name="Laia" />
      <Welcome name="Cristina" />
    </div>
  );
}

export default App;