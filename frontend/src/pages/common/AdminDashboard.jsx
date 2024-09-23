import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {

    const navigate = useNavigate()

    const handlePriceOptimizationButtonClick = () => {
        navigate('/admin/priceOptimization/demandAnalysis')
    }
    const handleCustomerRelationshipButtonClick = () => {
        navigate('/admin/customerRelationship/admin/crmDashboard')
    }
    const handleCustomerRelationshipReviewButtonClick = () => {
        navigate('/admin/customerRelationship/customer/profile/addreview')
    }

  return (
    <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard</p>
        
        <button onClick={handlePriceOptimizationButtonClick}>Sales Optimization</button>
        <br />
        <button onClick={handleCustomerRelationshipButtonClick}>Customer relationship</button>
        <br />
        <button onClick={handleCustomerRelationshipReviewButtonClick}>Customer relationship (Reviews)</button>

    </div>
  )
}

export default AdminDashboard