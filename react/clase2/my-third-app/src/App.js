import React from "react";


// clase 2 Ej.1.2. refactorización importando App a index.js
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default App;
