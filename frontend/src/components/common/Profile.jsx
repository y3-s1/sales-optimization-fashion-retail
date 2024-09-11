import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css'

function Profile() {
  return (
    <>
    <h1 className="profile-title">Customer Profile</h1>
Feedback Section
        <div id="feedback" className="profile-section mt-4">
          <h2>Feedback</h2>
          <p>Here you can add customer feedback form or display existing feedback.</p>
        </div>

        Loyalty Section
        <div id="loyalty" className="profile-section mt-4">
          <h2>Loyalty</h2>
          <p>Here you can show the customer's loyalty points, rewards, or status in the loyalty program.</p>
          </div>
    </>
  );
}

export default Profile;
