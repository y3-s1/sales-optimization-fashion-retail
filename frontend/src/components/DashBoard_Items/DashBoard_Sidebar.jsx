import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillGridFill, BsPlusCircleFill, BsListUl } from 'react-icons/bs'; // Importing relevant icons
import './dashBoard_Sidebar.css';

const FashionRetailDashboardSidebar = () => {
  return (
    <div className="fashion-retail-sidebar">
      <ul className="fashion-retail-sidebar-nav">
        <li className="fashion-retail-sidebar-item">
          <NavLink
            className="fashion-retail-sidebar-link"
            activeClassName="active"
            to={"/InventoryDashboard/"}
            exact
          >
            <BsFillGridFill className="sidebar-icon" /> All Items
          </NavLink>
        </li>
        <li className="fashion-retail-sidebar-item">
          <NavLink
            className="fashion-retail-sidebar-link"
            activeClassName="active"
            to={"/InventoryDashboard/AddItem"}
          >
            <BsPlusCircleFill className="sidebar-icon" /> Add Item
          </NavLink>
        </li>
        <li className="fashion-retail-sidebar-item">
          <NavLink
            className="fashion-retail-sidebar-link"
            activeClassName="active"
            to={"/Inventory_Dashboard/Notifications"}
          >
            <BsListUl className="sidebar-icon" /> Notifications
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default FashionRetailDashboardSidebar;
