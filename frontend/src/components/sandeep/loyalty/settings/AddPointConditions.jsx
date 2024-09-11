import React, { useEffect, useState } from 'react'
import AddLoyaltyPopup from './AddLoyaltyPopup';
import demandAxios from "../../../../BaseURL";

function AddPointConditions({ conditions }) {
    const [showPopup, setShowPopup] = useState(false);
    const [allConditions, setAllConditions] = useState(conditions);

  // Function to handle adding a new condition
  const handleAddCondition = async (newCondition) => {
    try {
        // Make a POST request to the backend API to create the condition
        console.log(newCondition)
        const response = await demandAxios.post('/loyalty/set-conditions', newCondition); // Adjust the endpoint if necessary
        
        if (response.status === 200 || response.status === 201) {
          // Update local state with the new condition
          setAllConditions((prev) => ({
            ...prev,
            [newCondition.type]: [...prev[newCondition.type], response.data.config.conditions.pop()],
          }));
        } else {
          console.error('Failed to add condition:', response.data.error);
        }
      } catch (error) {
        console.error('Error adding condition:', error);
      }
  };
  return (
    <>
    <div className="container mt-5">
      <h2 className="mb-4">Earning Points</h2>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Rule Type</th>
            <th>Rule Value</th>
            <th>Rule Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Render Purchasing Conditions */}
          {allConditions.purchasing.map((cond, index) => (
            <tr key={`purchasing-${index}`}>
              {index === 0 && (
                <td rowSpan={conditions.purchasing.length}>Purchasing</td>
              )}
              <td>{cond.points} Points</td>
              <td>${cond.amount}.00 off entire sale</td>
              <td className="text-primary text-center">Edit</td>
            </tr>
          ))}
          
          {/* Render Action Conditions */}
          {allConditions.actions.map((cond, index) => (
            <tr key={`action-${index}`}>
              {index === 0 && (
                <td rowSpan={conditions.actions.length}>Action</td>
              )}
              <td>{cond.points} Points</td>
              <td>{`Earn points by ${cond.action}`}</td>
              <td className="text-primary text-center">Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add a New Condition Link */}
      <div className="loyal-popup-btn text-primary" onClick={() => setShowPopup(true)}>Add a New Condition</div>

      {/* Show the popup if showPopup is true */}
      {showPopup && <AddLoyaltyPopup onClose={() => setShowPopup(false)} onSubmit={handleAddCondition} />}
    </div>
    </>
  )
}

export default AddPointConditions