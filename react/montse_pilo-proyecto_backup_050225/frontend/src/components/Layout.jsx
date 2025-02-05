import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';


const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
