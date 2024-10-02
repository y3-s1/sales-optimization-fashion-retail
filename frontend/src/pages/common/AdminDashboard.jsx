import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {

    const navigate = useNavigate()

    const handlePriceOptimizationButtonClick = () => {
        navigate('/admin/priceOptimization')
    }
    const handleCustomerRelationshipButtonClick = () => {
        navigate('/admin/customerRelationship/admin/crmDashboard')
    }
    const handleCustomerRelationshipReviewButtonClick = () => {
        navigate('/admin/customerRelationship/customer/profile/addreview')
    }
    const handleHeaderButtonClick = () => {
        navigate('../salescampaigns/allcampaigns');  // Navigate to the route where Header component is rendered
      };
      

  return (
    <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard</p>
        
        <button onClick={handlePriceOptimizationButtonClick}>Sales Optimization</button>
        <br />
        <button onClick={handleCustomerRelationshipButtonClick}>Customer relationship</button>
        <br />
        <button onClick={handleCustomerRelationshipReviewButtonClick}>Customer relationship (Reviews)</button>
        <br />
        <button onClick={handleHeaderButtonClick}>Sales Campaigns</button>

    </div>
  )
}

export default AdminDashboard