import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function SideNavBar({ activeButton, setActiveButton }) {
  const navigate = useNavigate();

  const activate = (prop) => {
    setActiveButton(prop);
  };

  const handleLogoButtonClick = () => {
    navigate('/admin/dashboard'); // Correct use of the navigate function
  }

  return (
    <div>
      <div className="priceOptimization-sideNavBar-logo" onClick={handleLogoButtonClick}>
        <img src={require("../../../image/logo.png")} alt="Logo" />
      </div>
      <ul className="priceOptimization-sideNavBar-nav-list">
        <li>
          <button
            className={`priceOptimization-sideNavBar-nav-item  ${
              activeButton === 1
                ? "priceOptimization-sideNavBar-nav-item active"
                : "text-gray-400 "
            }`}
            onClick={(e) => {
              e.preventDefault();
              activate(1);
            }}
          >
            Demand Analysis
          </button>
        </li>
        <li>
          <button
            className={`priceOptimization-sideNavBar-nav-item  ${
              activeButton === 2
                ? "priceOptimization-sideNavBar-nav-item active"
                : "text-gray-400 "
            }`}
            onClick={(e) => {
              e.preventDefault();
              activate(2);
            }}
          >
            Predictions
          </button>
        </li>
        <li>
          <button
            className={`priceOptimization-sideNavBar-nav-item  ${
              activeButton === 3
                ? "priceOptimization-sideNavBar-nav-item active"
                : "text-gray-400 "
            }`}
            onClick={(e) => {
              e.preventDefault();
              activate(3);
            }}
          >
            Price Update
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideNavBar;
