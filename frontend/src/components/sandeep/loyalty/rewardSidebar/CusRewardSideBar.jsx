import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import '../../../../pages/sandeep/customerRelationship.css'; 
import { AuthContext } from '../../../../context/AuthContext';
import demandAxios from '../../../../BaseURL';

function CusRewardSideBar() {

  const { user } = useContext(AuthContext);
  const [points, setPoints] = useState(0); // State to store points

  useEffect(() => {
    // Function to fetch user points
    const fetchUserPoints = async () => {
      try {
        if (user && user._id) { // Check if user and user._id exist
          const response = await demandAxios.get(`/customer/getUserPoints/${user._id}`);
          setPoints(response.data.points); // Update points from API response
        }
      } catch (error) {
        console.error("Error fetching user points:", error);
      }
    };

    fetchUserPoints(); // Fetch points when component mounts
  }, [user]); // Rerun effect if the user changes


  return (
    <>
    {/* Sidebar section */}
    <div className="loyaltyCHome-sidebar">
    <div className="loyaltyCHome-pointsSection">
        <h3 className="loyaltyCHome-points">{points}</h3>
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
