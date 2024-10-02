import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CusNavBar from '../../components/common/CusNavBar'
import Profile from './Profile'
import LoginPage from './LoginPage'
import AllProductsForFeed from './AllProductsForFeed'
import '../../pages/sandeep/customerRelationship.css'
import SingleFashionProduct from './SingleFashionProduct'
import CustomerLoyaltyHomePage from '../sandeep/loyalty/rewards/CustomerLoyaltyHomePage'
import User_allItems from '../../components/inventory/User/User_allItems'
import CartPage from './CartPage'
import CheckoutPage from './CheckoutPage'

function Customer() {
  return (
    <>
    <CusNavBar/>
    <div className='customerHome'>
    <Routes>
        <Route path="/profile/*" element={<Profile />}></Route>
        <Route path="/cart/*" element={<CartPage />}></Route>
        <Route path="/checkout/*" element={<CheckoutPage />}></Route>
        <Route path="/rewards/*" element={<CustomerLoyaltyHomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/AllFProducts/*" element={<AllProductsForFeed />}></Route>
        <Route path="/product/:id" element={<SingleFashionProduct />}></Route>
        <Route path="/User/*" element={<User_allItems />}></Route>
    </Routes>
    </div>
    </>
  )
}

export default Customer