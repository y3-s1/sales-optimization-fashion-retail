import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CusNavBar from '../../components/common/CusNavBar'
import Profile from './Profile'

function Customer() {
  return (
    <>
    <CusNavBar/>
    <Routes>
        <Route path="/profile/*" element={<Profile />}></Route>
    </Routes>
    </>
  )
}

export default Customer