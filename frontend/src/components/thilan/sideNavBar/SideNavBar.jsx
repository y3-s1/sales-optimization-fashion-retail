import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function SideNavBar() {
  const navigate = useNavigate();

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
          <NavLink
            activeClassName="active"
            className="priceOptimization-sideNavBar-nav-item"
            to={"/admin/priceOptimization/demandAnalysis"}
          >
            Demand Analysis
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="priceOptimization-sideNavBar-nav-item"
            to={"/admin/priceOptimization/predictions"}
          >
            Predictions
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="priceOptimization-sideNavBar-nav-item"
            to={"/admin/priceOptimization/priceUpdate"}
          >
            Price Update
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNavBar;
