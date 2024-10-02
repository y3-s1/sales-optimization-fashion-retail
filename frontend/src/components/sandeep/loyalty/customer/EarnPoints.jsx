import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../../pages/sandeep/customerRelationship.css';
import demandAxios from '../../../../BaseURL';

function EarnPoints() {
  const [conditions, setConditions] = useState({ purchasing: [], actions: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoyaltyConditions = async () => {
      try {
        const response = await demandAxios.get('loyalty/conditions/all');
        setConditions(response.data.conditions); // Store the fetched data in state
      } catch (error) {
        setError('Error fetching loyalty conditions');
        console.error('Error fetching conditions:', error);
      }
    };

    fetchLoyaltyConditions();
  }, []);

  return (
    <>
      <h3 className="loyaltyCHome-maincontent-heading">EARN MORE POINTS</h3>
      <div className="earnPoints-container">
        <h2 className="earnPoints-title">Earn Points</h2>
        <p className="earnPoints-description">EARN LOYALTY POINTS BY PARTICIPATING IN OUR ACTIVITIES:</p>

        {/* Error Handling */}
        {error && <p className="earnPoints-error">{error}</p>}

        {/* Render purchasing conditions */}
        <h3 className="earnPoints-subtitle">Purchasing Conditions</h3>
        <ul className="earnPoints-list">
          {conditions.purchasing.length > 0 ? (
            conditions.purchasing.map((condition, index) => (
              <li key={index}>
                Make a purchase – {condition.points} points for every ${condition.amount} spent
              </li>
            ))
          ) : (
            <li>No purchasing conditions available.</li>
          )}
        </ul>

        {/* Render action-based conditions */}
        <h3 className="earnPoints-subtitle">Action-based Conditions</h3>
        <ul className="earnPoints-list">
          {conditions.actions.length > 0 ? (
            conditions.actions.map((condition, index) => (
              <li key={index}>
                {condition.action.charAt(0).toUpperCase() + condition.action.slice(1)} – {condition.points} points
              </li>
            ))
          ) : (
            <li>No action-based conditions available.</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default EarnPoints;
