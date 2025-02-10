import Layout from "./routes/Layout"; // importamos el componente Layout
import Login from "./routes/Login"; // importamos el componente Login

const App = () => ({
    path: "/",
    element: <Login />
  },
  {
    path: "/layout",
    element: <Layout />
  }
);

export default App;
