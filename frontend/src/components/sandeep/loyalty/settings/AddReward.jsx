import React from 'react'
import { useState } from 'react';
import demandAxios from '../../../../BaseURL';
import AddRewardPopup from './AddRewardPopup';

function AddReward({ rewards = [] }) {
    const [showPopup, setShowPopup] = useState(false);
    const [allRewards, setAllRewards] = useState(rewards);


    const handleAddReward = async (newReward) => {
        try {
          // Make a POST request to the backend API to create the reward
          console.log(newReward);
          const response = await demandAxios.post('/loyalty/add-reward', newReward); // Adjust the endpoint if necessary
      
          if (response.status === 200 || response.status === 201) {
            // Update local state with the new reward
            setAllRewards((prevRewards) => [
              ...prevRewards, 
              response.data.reward // Assuming the API response contains the added reward in `response.data.reward`
            ]);
          } else {
            console.error('Failed to add reward:', response.data.error);
          }
        } catch (error) {
          console.error('Error adding reward:', error);
        }
      };
      

  return (
    <>
    <div className="container mt-5">
      <h2 className="mb-4">Redeeming Rewards</h2>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Reward Value</th>
            <th>Reward Description</th>
            <th>Reward Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {allRewards.map((reward, index) => (
                <tr key={index}>
                    <td>{reward.pointsRequired}</td>
                    <td>{reward.name}</td>
                    <td>{reward.category}</td>
                    <td className="text-center">...</td>
                </tr>))}
        {/* //   <tr>
        //     <td>1 Point</td>
        //     <td>$5.00 off entire sale</td>
        //     <td className="text-center">...</td>
        //   </tr>
        //   <tr>
        //     <td>50 Points</td>
        //     <td>$10.00 off any T-shirt</td>
        //     <td className="text-center">...</td>
        //   </tr>
        //   <tr>
        //     <td>75 Points</td>
        //     <td>Free T-shirt</td>
        //     <td className="text-center">...</td>
        //   </tr> */}
        </tbody>
      </table>
      {/* Add a New Reward Link */}
      <div className="loyal-popup-btn text-primary" onClick={() => setShowPopup(true)}>Add a New Reward</div>

      {/* Show the popup if showPopup is true */}
      {showPopup && <AddRewardPopup onClose={() => setShowPopup(false)} onSubmit={handleAddReward} />}
    </div>
    </>
  );
}

export default AddReward