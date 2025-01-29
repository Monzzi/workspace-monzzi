import React from "react";

const UserGreeting = () => {
  return <h1>Bienvenid@ de nuevo!</h1>;
};

const SignUp = () => {
  return <h1>Por favor, haz login!</h1>;
};

const Greeting = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <UserGreeting />;
  } else {
    return <SignUp />;
  }
};

export default Greeting;
