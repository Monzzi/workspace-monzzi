// este será el componente Layout llegaremos desde aquí '/' donde estará el login.
// tiene que tener un titulo arriba, un menú con el link de profile y el link o botón de Logout
import { Link } from "react-router-dom";    


export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Proyecto React MonzziDev</h1>
          <nav>
            <ul>
              <li>
                <Link to={`/Profile`}>Perfil</Link>
              </li>
              <li>
                <Link to={`/Users`}>Usuarios</Link>
              </li>
              <li>
                <Link to={`/Students`}>Estudiantes</Link>
              </li>
            </ul>
          </nav>
              <button type="submit">Cerrar Sesión</button>
        <div id="detail"></div>
        </div>
      </>
    );
  }
  