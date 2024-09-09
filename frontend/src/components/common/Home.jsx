import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate()

  const handlePriceOptimizationButtonClick = () => {
    navigate('/priceOptimization/dashboard')
  }

  return (
    <>
      <div>Home Component</div>
      <button onClick={handlePriceOptimizationButtonClick}>Price Optimization</button>
    </>
  )
}

export default Home