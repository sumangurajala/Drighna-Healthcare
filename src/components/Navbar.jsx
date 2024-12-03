import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../store/sidebarSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <button onClick={() => dispatch(toggleSidebar())}>
        Toggle Sidebar
      </button>
      {/* Add more navbar items as per your requirement */}
    </div>
  );
};

export default Navbar;
