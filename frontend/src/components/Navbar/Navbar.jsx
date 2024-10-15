// src/pages/Navbar/Navbar.jsx
import React from 'react';
import './navbar.css';
import logo from '../../assets/logo.png'; // Import your logo image
import profilePic from '../../assets/profile.svg'; // Import your profile image
import notificationIcon from '../../assets/notification.svg'; // Import notification bell icon
import helpIcon from '../../assets/help.svg'; // Import help icon

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="College Logo" className="college-logo" />
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/campus-map">Campus Map</a></li>
        <li><a href="/college-faculty">College Faculty</a></li>
        <li><a href="/events-scheduled">Events Scheduled</a></li>
      </ul>
      <div className="navbar-icons">
        <img src={notificationIcon} alt="Notifications" className="icon" />
        <img src={helpIcon} alt="Help" className="icon" />
        <img src={profilePic} alt="Profile" className="icon profile-pic" />
      </div>
    </nav>
  );
};

export default Navbar;