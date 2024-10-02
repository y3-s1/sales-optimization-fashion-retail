import React, { useState } from 'react';
import demandAxios from '../../../../BaseURL';
import AddRewardPopup from './AddRewardPopup';

function AddReward({ rewards = [] }) {
    const [showPopup, setShowPopup] = useState(false);
    const [allRewards, setAllRewards] = useState(rewards);

    const handleAddReward = async (newReward) => {
        try {
          const response = await demandAxios.post('/loyalty/add-reward', newReward, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
      
          if (response.status === 200 || response.status === 201) {
            setAllRewards((prevRewards) => [
              ...prevRewards, 
              response.data.reward
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
            <th>Badge</th>
            <th>Reward Value</th>
            <th>Reward Description</th>
            <th>Reward Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {allRewards.map((reward, index) => (
                <tr key={index}>
                    <td>
                      {reward.imageUrl ? (
                        <img src={`http://localhost:8070${reward.imageUrl}`} alt="Reward Badge" style={{ width: '50px', height: '50px' }} />
                      ) : 'No Image'}
                    </td>
                    <td>{reward.pointsRequired}</td>
                    <td>{reward.name}</td>
                    <td>{reward.category}</td>
                    <td className="text-center">...</td>
                </tr>))} 
        </tbody>
      </table>
      
      <div className="loyal-popup-btn text-primary" onClick={() => setShowPopup(true)}>Add a New Reward</div>

      {showPopup && <AddRewardPopup onClose={() => setShowPopup(false)} onSubmit={handleAddReward} />}
    </div>
    </>
  );
}

export default AddReward;
