import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PriceOptimization from '../thilan/PriceOptimization'
import CrmHome from '../sandeep/CrmHome'
import AdminDashboard from './AdminDashboard'
import InventoryDashboard from '../inventory/InventoryDashboard'
import Header from '../salecampaigns/Header'
import AddCampaign from '../salecampaigns/AddCampaign'

function Admin() {
  return (
    <>
      <div className="admin-allContent">
        <div className="admin-header">
        </div>
        <div className="admin-pages">
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/priceOptimization/*" element={<PriceOptimization />} />
            <Route path="/customerRelationship/*" element={<CrmHome />} />
            <Route path="/inventory/*" element={<InventoryDashboard />} />
            <Route path="/salescampaigns/*" element={<Header />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Admin