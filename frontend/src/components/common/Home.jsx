import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

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
    <>
      <div>Home Component</div>
      <button onClick={handlePriceOptimizationButtonClick}>Price Optimization</button>
      <br />
      <button onClick={handleCustomerRelationshipButtonClick}>Customer relationship</button>
      <br />
      <button onClick={handleCustomerRelationshipReviewButtonClick}>Customer relationship (Reviews)</button>
    </>
  )
}

export default Home