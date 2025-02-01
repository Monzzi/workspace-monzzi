import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <>
      <div id="sidebar">
        <hi>React Router Monzzi</hi>
        <nav>
          <ul>
            <li>
              <a href={'/clock'}>Clock</a>
            </li>
            <li>
              <a href={'/people'}>People</a>
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
