import React, { useState, useEffect, useContext } from 'react';
import '../../../../pages/sandeep/customerRelationship.css'; // Importing the CSS file
import demandAxios from '../../../../BaseURL';
import { AuthContext } from '../../../../context/AuthContext';

function CustomerLoyaltyDHome({ customerPoints }) {
  const [rewards, setRewards] = useState([]); // Available rewards
  const [redeemedRewards, setRedeemedRewards] = useState([]); // Redeemed rewards
  const { user } = useContext(AuthContext); // Access user context and function to update user points

  // Fetch the rewards from the backend
  useEffect(() => {
    async function fetchRewards() {
      try {
        const response = await demandAxios.get(`/loyalty/rewards/`); // Fetch available rewards
        console.log(response.data)
        setRewards(response.data);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      }
    }

    async function fetchRedeemedRewards() {
      try {
        const response = await demandAxios.get(`/loyalty/redeemed-rewards/${user._id}`); // Fetch redeemed rewards for the user
        console.log(response.data)
        setRedeemedRewards(response.data);
      } catch (error) {
        console.error('Error fetching redeemed rewards:', error);
      }
    }

    fetchRewards();
    fetchRedeemedRewards(); // Fetch redeemed rewards when the component loads
  }, [user._id]);

  // Redeem reward and update user's points
  const redeemReward = async (reward) => {
    if (reward.pointsRequired > user.points) return;

    try {
      // Backend call to redeem the reward
      const response = await demandAxios.post(`/loyalty/redeem/${user._id}`, {
        rewardId: reward._id,
        pointsRequired: reward.pointsRequired,
      });

      // Store redeemed reward code locally
      setRedeemedRewards((prev) => [
        ...prev,
        { rewardId: reward, uniqueCode: response.data.uniqueCode },
      ]);

    } catch (error) {
      console.error('Error redeeming reward:', error);
    }
  };

  return (
    <>
      <h3 className="loyaltyCHome-maincontent-heading">YOUR REWARDS ACCOUNT</h3>

      {/* Available Rewards */}
      <div className="loyaltyCHome-rewardsSection">
        <h6>GET REWARDS</h6>
        <div className="loyaltyCHome-rewardGrid">
          {rewards.map((reward, index) => (
            <div key={index} className="loyaltyCHome-rewardCard">
              <img
                src={`http://localhost:8070${reward.imageUrl}`}
                alt={reward.name}
                className="loyaltyCHome-rewardImage"
              />
              <p className="loyaltyCHome-rewardTitle">{reward.name}</p>
              <p className="loyaltyCHome-rewardSubtitle">
                {reward.pointsRequired} points
              </p>
              {/* Display the redeem button */}
              <button
                className={
                  reward.pointsRequired > user.points
                    ? 'loyaltyCHome-buttonDisabled'
                    : 'loyaltyCHome-buttonEnabled'
                }
                disabled={reward.pointsRequired > user.points}
                onClick={() => redeemReward(reward)}
              >
                {reward.pointsRequired > user.points ? 'MORE POINTS NEEDED' : 'GET REWARD'}
              </button>
            </div>
          ))}
        </div>

        <hr />
        <h6>REDEEMED REWARDS</h6>
        <div className="loyaltyCHome-rewardGrid">
          {redeemedRewards.map((redeemedReward, index) => (
            <div key={index} className="loyaltyCHome-rewardCard">
              <img
                src={redeemedReward.rewardId.imageUrl?`http://localhost:8070${redeemedReward.rewardId.imageUrl}`: ''}
                alt={redeemedReward.rewardId.name}
                className="loyaltyCHome-rewardImage"
              />
              <p className="loyaltyCHome-rewardTitle">{redeemedReward.rewardId.name}</p>
              <p className="loyaltyCHome-rewardSubtitle">Redeemed: {redeemedReward.uniqueCode}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Redeemed Rewards */}
      <div className="loyaltyCHome-rewardsSection">
        
      </div>
    </>
  );
}

export default CustomerLoyaltyDHome;
