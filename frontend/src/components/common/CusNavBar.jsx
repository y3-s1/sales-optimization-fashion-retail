import React from 'react';
import { NavLink } from 'react-router-dom';
import './cusNav.css'; // Assuming you're importing your CSS file

function CusNavBar() {
  return (
    <>
      <header className="cusNav-header">
        <h1 className="cusNav-logo">
          <NavLink to="/">FashionGolob</NavLink>
        </h1>
        <ul className="cusNav-main-nav">
          <li>
            <NavLink exact to="/" activeClassName="cusNav-active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="cusNav-active">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" activeClassName="cusNav-active">
              contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/customer/profile" activeClassName="cusNav-active">
              Profile
            </NavLink>
          </li>
        </ul>
      </header>
    </>
  );
}

export default CusNavBar;
