import React from 'react'
import { NavLink } from 'react-router-dom'

function SideNavBar() {
  return (
    <div>
      <ul className="priceOptimization-sideNavBar-nav-list">
        <li>
          <NavLink
            exact
            activeClassName="active"
            className="priceOptimization-sideNavBar-nav-item"
            to={"/priceOptimization/dashboard"}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="priceOptimization-sideNavBar-nav-item"
            to={"/priceOptimization/demandAnalysis"}
          >
            Demand Analysis
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="priceOptimization-sideNavBar-nav-item"
            to={"/priceOptimization/predictions"}
          >
            Predictions
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="priceOptimization-sideNavBar-nav-item"
            to={"/priceOptimization/priceUpdate"}
          >
            Price Update
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default SideNavBar