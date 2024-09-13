import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function CrmNavBar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="crm-wrapper">
      {/* Top Navbar */}
      <nav className="crm-top-navbar navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleSidebar} // Toggle sidebar on click
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          <img
            src={require('../../../image/Screenshot 2024-09-11 091052.png')}
            alt="Logo"
            height="50"
            width={130}
          />
        </a>
      </nav>

      <div className={`d-flex ${sidebarVisible ? 'show-sidebar' : ''}`}>
        {/* Sidebar */}
        <nav className={`crm-sidebar bg-light ${sidebarVisible ? 'active' : ''}`}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                to="/admin/customerRelationship/admin/crmDashboard"
                className="nav-link crm-sidebar-link"
                activeClassName="active"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/customerRelationship/admin/crmSettings"
                className="nav-link crm-sidebar-link"
                activeClassName="active"
              >
                Settngs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/dashboard"
                className="nav-link crm-sidebar-link"
                activeClassName="active"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/content"
                className="nav-link crm-sidebar-link"
                activeClassName="active"
              >
                Content
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/analytics"
                className="nav-link crm-sidebar-link"
                activeClassName="active"
              >
                Analytics
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/settings"
                className="nav-link crm-sidebar-link"
                activeClassName="active"
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Main content area */}
        
      </div>
    </div>
  );
}

export default CrmNavBar;
