import React from 'react';
import '../../../../pages/sandeep/customerRelationship.css';

function ReferFriends() {
  return (
    <>
    <h3 className="loyaltyCHome-maincontent-heading">REFER YOUR FRIENDS</h3>
    <div className="referFriends-container">
      <h2 className="referFriends-title">SEND INVITATION</h2>
      <p className="referFriends-description">Earn rewards by referring friends:</p>
      <p className="referFriends-text">Invite your friends and earn 500 points for every friend who signs up!</p>
      <input type="email" placeholder="Enter friend's email" className="referFriends-input" />
      <button className="referFriends-button">Send Invite</button>
    </div>
    </>

  );
}

export default ReferFriends;
