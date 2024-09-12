import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomerRelationship from './CustomerRelationship'
import CreateReview from './feedback/customer/CreateReview'

function CrmHome() {
  return (
    <>
    <Routes>
        <Route path="/admin/*" element={<CustomerRelationship />}></Route>
        <Route path="/customer/profile/addReview" element={<CreateReview />}></Route>
    </Routes>
    </>
  )
}

export default CrmHome