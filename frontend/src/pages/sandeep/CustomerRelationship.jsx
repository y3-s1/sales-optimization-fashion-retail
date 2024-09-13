import React from 'react'
import './customerRelationship.css'
import CrmNavBar from '../../components/sandeep/sideBar/CrmNavBar'
import './customerRelationship.css'
import { Route, Routes } from 'react-router-dom'
import CrmDashboard from './dashboard/CrmDashboard'
import LoyaltySetting from './loyalty/settings/LoyaltySetting'

function CustomerRelationship() {
  return (
    <>
    <CrmNavBar/>
    <div className="crm-content p-4">
    <Routes>
        <Route path="/crmDashboard" element={<CrmDashboard />}></Route>
        <Route path="/crmSettings" element={<LoyaltySetting/>}></Route>
    </Routes>
    </div>
    </>
  )
}

export default CustomerRelationship