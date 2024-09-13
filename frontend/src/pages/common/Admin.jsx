import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import PriceOptimization from '../thilan/PriceOptimization'
import CrmHome from '../sandeep/CrmHome'
import AdminDashboard from './AdminDashboard'

function Admin() {

    
  return (
    <>
        <div className="admin-allContent">
          <div className="admin-header">
          </div>
          <div className="admin-pages">
            <Routes>
                <Route path="/dashboard" element={<AdminDashboard />}></Route>
                <Route path="/priceOptimization/*" element={<PriceOptimization />}></Route>
                <Route path="/customerRelationship/*" element={<CrmHome />}></Route>
            </Routes>
          </div>
        </div>
    </>
  )
}

export default Admin