import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './cusNav.css'; // Assuming you're importing your CSS file
import { AuthContext } from '../../context/AuthContext';

function CusNavBar() {

  const { user } = useContext(AuthContext);

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
            <NavLink exact to="/customer/AllFProducts" activeClassName="cusNav-active">
              Fashion
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/customer/rewards" activeClassName="cusNav-active">
              Rewards
            </NavLink>
          </li>
          <li>
            <NavLink to="/customer/about" activeClassName="cusNav-active">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/customer/cart" activeClassName="cusNav-active">
              Cart
            </NavLink>
          </li>
          {user ? (
            // If user is logged in, show the Profile link
            <li>
              <NavLink to="/customer/profile" activeClassName="cusNav-active">
                Profile
              </NavLink>
            </li>
          ) : (
            // If user is not logged in, show the Login link
            <li>
              <NavLink to="/customer/login" activeClassName="cusNav-active">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </>
  );
}

export default CusNavBar;
