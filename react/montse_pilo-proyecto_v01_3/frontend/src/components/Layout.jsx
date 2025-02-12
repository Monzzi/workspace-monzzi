// components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from '../pages/Footer';

const Layout = () => {
  return (
    <div id="root">
      <Sidebar />
      <div id="detail">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;