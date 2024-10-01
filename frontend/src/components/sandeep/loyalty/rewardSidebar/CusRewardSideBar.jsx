import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import '../../../../pages/sandeep/customerRelationship.css'; 
import { AuthContext } from '../../../../context/AuthContext';

function CusRewardSideBar() {

  const { user } = useContext(AuthContext);

  return (
    <>
    {/* Sidebar section */}
    <div className="loyaltyCHome-sidebar">
    <div className="loyaltyCHome-pointsSection">
        <h3 className="loyaltyCHome-points">{user.points}</h3>
        <p className="loyaltyCHome-pointsName">POINTS</p>
        <p className="loyaltyCHome-tier">💎 Silver</p>
    </div>
    <hr />
    <ul className="loyaltyCHome-navList">
        <li className="loyaltyCHome-nav-item">
        <Link to="/customer/rewards">GET REWARDS</Link>
        </li>
        <li className="loyaltyCHome-nav-item">
        <Link to="/customer/rewards/earn-points">EARN POINTS</Link>
        </li>
        <li className="loyaltyCHome-nav-item">
        <Link to="/customer/rewards/refer-friends">REFER FRIENDS</Link>
        </li>
        <li className="loyaltyCHome-nav-item">
        <Link to="/customer/rewards/tiers">TIERS</Link>
        </li>
        <li className="loyaltyCHome-nav-item">
        <Link to="/customer/rewards/account">ACCOUNT</Link>
        </li>
        <li className="loyaltyCHome-nav-item">
        <Link to="/customer/rewards/help">HELP</Link>
        </li>
    </ul>
    </div>

    </>
  );
}

export default CusRewardSideBar;
