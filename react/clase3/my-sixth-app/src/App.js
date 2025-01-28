import React from 'react';
import './App.css';

const FancyBorder = (props) => {
  return (
    <div className={"FancyBorder FancyBorder-" + props.color}>
      {props.children}
    </div>
  );
};

const WelcomeDialog = () => {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Bienvenido</h1>
      <p className="Dialog-message">Explora todos nuestros productos.</p>
    </FancyBorder>
  );
};

const GoodByeDialog = () => {
  return (
    <FancyBorder color="red">
      <h1 className="Dialog-title">Adiós</h1>
      <p className="Dialog-message">Gracias por visitarnos</p>
    </FancyBorder>
  );
};

const App = () => {
  return (
    <>
      <WelcomeDialog />
      <GoodByeDialog />
    </>
  );
};
export default App;
