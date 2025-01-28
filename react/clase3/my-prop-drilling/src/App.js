import './App.css';

// 3 capas. más código más difícil de reutilizar.

// const App = () => {
//   const userName = "Joe";
//   return <WelcomePage userName={userName} />;
// };

// const WelcomePage = ({ userName }) => {
//   return (
//     <>
//       <WelcomeMessage userName={userName} />
//       {/* Otro código de la página de bienvenida */}
//     </>
//   );
// };

// const WelcomeMessage = ({ userName }) => {
//   return <h1>Hey, {userName}!</h1>;
// };



// Prop drilling o perforación de props. Eliminamos una capa. Descomentar.
const App = () => {
  const userName = "Joe";
  return (
    <WelcomePage title={<WelcomeMessage userName={userName} />}
    />
  );
};
const WelcomeMessage = ({userName}) => {
  return (
    <div>
      <h1>Hey, {userName}!</h1>
    </div>
  );
};

const WelcomePage = ({title}) => {
  return (
    <>
    {title}
    <p>Bienvenido a nuestra aplicación</p>
    </>
  );
};



export default App;
