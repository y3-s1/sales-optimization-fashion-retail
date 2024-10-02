import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

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
  const handleInventoryButtonClick = () => {
    navigate('/admin/inventory')
  }
  const handleUserSearchButtonClick = () => {
    navigate('/customer/User')
  }
  const handleSingleItemButtonClick = () => {
    navigate('/SingleItem')
  }


  

  return (
    <>
      <div>Home Component</div>
      <button onClick={handlePriceOptimizationButtonClick}>Price Optimization</button>
      <br />
      <button onClick={handleCustomerRelationshipButtonClick}>Customer relationship</button>
      <br />
      <button onClick={handleCustomerRelationshipReviewButtonClick}>Customer relationship (Reviews)</button>
      <br />
      <button onClick={handleInventoryButtonClick}>Inventory</button>
      <br />
      <button onClick={handleUserSearchButtonClick}>User Search</button>
      <br />
      <button onClick={handleSingleItemButtonClick}>Single Item</button>
      <br />
    </>
  )
}

export default Home