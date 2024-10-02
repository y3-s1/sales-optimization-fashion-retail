import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllItems from '../../components/inventory/AllItems'; // Lists all retail items
import AddItem from '../../components/inventory/AddItem'; // Adds new retail items
import DashBoard_Sidebar from '../../components/DashBoard_Items/DashBoard_Sidebar'; // Sidebar with navigation
import './InventoryDashboard.css'; // Styles specific to fashion retail dashboard
import UpdateItem from '../../components/inventory/UpdateItem';

function InventoryDashboard() {
  return (
    <>
      <div className="inventory-container">
        <div className="inventory-dashboard-nav-bar">
          <DashBoard_Sidebar />
        </div>

        <div className="dashboard-pages">
          <br /><br />
          <Routes>
            <Route path="/" element={<AllItems />} />
            <Route path="/AddItem" element={<AddItem />} />
            <Route path="/:id" element={<UpdateItem />}></Route>
            {/* <Route path="/UpdateItem/:id" element={<UpdateItem />} /> */}
            {/* Additional routes can be added here */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default InventoryDashboard;
