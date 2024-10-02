import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import PriceOptimization from '../thilan/PriceOptimization'
import CrmHome from '../sandeep/CrmHome'
import AdminDashboard from './AdminDashboard'
import InventoryDashboard from '../inventory/InventoryDashboard'
import User_allItems from '../../components/inventory/User/User_allItems'
import UpdateItem from '../../components/inventory/UpdateItem'
import AdminTopNav from '../../components/common/AdminTopNav'

function Admin() {

    
  return (
    <>
        <div className="admin-allContent">
          <div className="admin-header">
            <AdminTopNav></AdminTopNav>
          </div>
          <div className="admin-pages">
            <Routes>
                <Route path="/dashboard" element={<AdminDashboard />}></Route>
                <Route path="/priceOptimization/*" element={<PriceOptimization />}></Route>
                <Route path="/customerRelationship/*" element={<CrmHome />}></Route>
                <Route path="/inventory/*" element={<InventoryDashboard />}></Route>
                
                <Route path="/User/*" element={<User_allItems />}></Route>
            </Routes>
          </div>
        </div>
    </>
  )
}

export default Admin