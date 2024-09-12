import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CusNavBar from '../../components/common/CusNavBar'
import Profile from './Profile'
import LoginPage from './LoginPage'

function Customer() {
  return (
    <>
    <CusNavBar/>
    <Routes>
        <Route path="/profile/*" element={<Profile />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
    </>
  )
}

export default Customer