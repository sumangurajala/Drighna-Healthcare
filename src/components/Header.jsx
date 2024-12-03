// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { toggleSidebar } from '../store/sidebarSlice';
// import { useNavigate } from "react-router-dom"; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faBars, faSearch, faBed, faLanguage, faComments, faCalendarCheck, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
// import Text from './Text';
// import './Header.css';
// import Logo from '../assets/Drighna_Logo_White.png';
// import ProfileLogo from '../assets/web-logo.png';

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("sessionData");
//     navigate("/");
//   };

//   return (
//     <header className="header">
//       <div className="header-left">
//         <button onClick={() => dispatch(toggleSidebar())} className="menu-button">
//           <FontAwesomeIcon icon={faBars} />
//         </button>
//         <Text size="20px" weight="700" color="#fff" className="header-healthcare">Healthcare</Text>
//         <div className="search-container">
//           <input type="text" placeholder="Search By Patient Name" className="search-bar" />
//           <FontAwesomeIcon icon={faSearch} className="search-icon" />
//         </div>
//       </div>
//       <div className="header-center">
//         <img src={Logo} alt="Drighna Healthcare Logo" className="logo-img" />
//       </div>
//       <div className="header-right">
//         <FontAwesomeIcon icon={faLanguage} className="header-icon" />
//         <div className="notification-icon">
//           <FontAwesomeIcon icon={faBell} className="header-icon" />
//           <Text size="8px" color="#fff" className="notification-badge">12</Text>
//         </div>
//         <FontAwesomeIcon icon={faComments} className="header-icon" />
//         <FontAwesomeIcon icon={faCalendarCheck} className="header-icon" />
//         <FontAwesomeIcon icon={faCheckSquare} className="header-icon" />
//         <div className="bed-status-container">
//           <FontAwesomeIcon icon={faBed} className="header-icon" />
//           <Text size="10px" weight="400" color="#fff" className="bed-status-text">Bed Status</Text>
//         </div>
//         <button className="logout-button" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;


// src/components/Header.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../store/sidebarSlice';
import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars, faSearch, faBed, faLanguage, faComments, faCalendarCheck, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import Text from './Text';
import './Header.css';
import Logo from '../assets/Drighna_Logo_White.png';
import ProfileLogo from '../assets/web-logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionData");
    navigate("/");
  };

  const navigateToCalendar = () => {
    navigate('/calendarpage'); // Navigate to the calendar page
  };

  return (
    <header className="header">
      <div className="header-left">
        <button onClick={() => dispatch(toggleSidebar())} className="menu-button">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Text size="20px" weight="700" color="#fff" className="header-healthcare">Healthcare</Text>
        <div className="search-container">
          <input type="text" placeholder="Search By Patient Name" className="search-bar" />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
      <div className="header-center">
        <img src={Logo} alt="Drighna Healthcare Logo" className="logo-img" />
      </div>
      <div className="header-right">
        <FontAwesomeIcon icon={faLanguage} className="header-icon" />
        <div className="notification-icon">
          <FontAwesomeIcon icon={faBell} className="header-icon" />
          <Text size="8px" color="#fff" className="notification-badge">12</Text>
        </div>
        <FontAwesomeIcon icon={faComments} className="header-icon" />
        {/* Calendar Icon with Navigate to Calendar Page */}
        <FontAwesomeIcon icon={faCalendarCheck} className="header-icon" onClick={navigateToCalendar} />
        <FontAwesomeIcon icon={faCheckSquare} className="header-icon" />
        <div className="bed-status-container">
          <FontAwesomeIcon icon={faBed} className="header-icon" />
          <Text size="10px" weight="400" color="#fff" className="bed-status-text">Bed Status</Text>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
