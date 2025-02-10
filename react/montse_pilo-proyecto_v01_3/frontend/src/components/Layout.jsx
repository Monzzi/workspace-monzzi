// components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div id="root">
      <Sidebar />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;