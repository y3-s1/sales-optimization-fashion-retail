import React from 'react'
import '../../../../pages/sandeep/customerRelationship.css';

function LoyaltyAccount() {
    return (
        <div className="account-container">
          <h2 className="account-title">My Account</h2>
          <div className="account-details">
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Membership Level:</strong> Silver</p>
            <button className="account-button">Update Info</button>
          </div>
        </div>
      );
}

export default LoyaltyAccount