import React, { useContext } from 'react'
import CustomerLoyaltyDHome from '../../../../components/sandeep/loyalty/customer/CustomerLoyaltyDHome'
import CusRewardSideBar from '../../../../components/sandeep/loyalty/rewardSidebar/CusRewardSideBar'
import { Route, Routes } from 'react-router-dom'
import CustomerLoyaltyTiers from '../../../../components/sandeep/loyalty/customer/CustomerLoyaltyTîers'
import EarnPoints from '../../../../components/sandeep/loyalty/customer/EarnPoints'
import ReferFriends from '../../../../components/sandeep/loyalty/customer/ReferFriends'
import LoyaltyAccount from '../../../../components/sandeep/loyalty/customer/LoyaltyAccount'
import UnregisteredLoyalty from '../../../../components/sandeep/loyalty/customer/UnregisteredLoyalty'
import { AuthContext } from '../../../../context/AuthContext';

function CustomerLoyaltyHomePage() {

  const { user } = useContext(AuthContext);

  return (
    <>

    {user ? (
              <div className="loyaltyCHome-container">
                    <CusRewardSideBar/>
                    <div className="loyaltyCHome-mainContent">
                    <Routes>
                      <Route path="/" element={<CustomerLoyaltyDHome />} />
                      <Route path="/tiers" element={<CustomerLoyaltyTiers />} />
                      <Route path="/earn-points" element={<EarnPoints />} />
                      <Route path="/refer-friends" element={<ReferFriends />} />
                      <Route path="/account" element={<LoyaltyAccount />} />
                      <Route path="/help" element={<UnregisteredLoyalty />} />
                    </Routes>
                    </div>
              </div>
            ) : (
              <UnregisteredLoyalty/>
            )}
    
    </>
  )
}

export default CustomerLoyaltyHomePage