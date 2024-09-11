import React from 'react'
import ProfileComponet from '../../components/common/Profile'
import { NavLink, Route, Routes } from 'react-router-dom'
import AddReviewForm from '../../components/sandeep/feedback/customer/AddReviewForm'

function Profile() {
  return (
    <>
      <div className="profile-container d-flex">
        <div className="profile-sidebar bg-light p-4">
          <h3 className="profile-sidebar-title mb-4">Profile Sections</h3>
          <ul className="profile-sidebar-menu list-group">
            <li className="list-group-item">
              <NavLink to="/customer/profile/review" activeClassName="active">
                Feedback
              </NavLink>
            </li>
            <li className="list-group-item">
              <NavLink to="/customer/profile/loyalty" activeClassName="active">
                Loyalty
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="profile-content p-4">
          <Routes>
            <Route path="/review" element={<AddReviewForm />} />
            <Route path="/" element={<ProfileComponet />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Profile;
