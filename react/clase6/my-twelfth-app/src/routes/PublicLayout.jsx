import { Outlet, Link } from 'react-router-dom';

function PublicLayout() {
  return (
    <>
      <div id="sidebar">
        <hi>React Router Monzzi CLASE 6</hi>
        <nav>
          <ul>
            <li>
              <Link to={'/clock'}>Clock</Link>
            </li>
            <li>
              <Link to={'/people'}>People</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default PublicLayout;