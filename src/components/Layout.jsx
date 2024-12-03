import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="layout">
        <Sidebar />
      
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
