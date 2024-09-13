import React, { useState, useEffect } from 'react';
import axios from 'axios';
import demandAxios from '../../../../BaseURL';

function UpdateLoyaltyConditionPopup({ onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    type: initialData.type || 'purchasing',
    amount: initialData.amount || '',
    points: initialData.points || '',
    action: initialData.action || ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Structure the form data for update
    let identifier = {};
    let update = {};

    if (formData.type === 'purchasing') {
      identifier = { amount: Number(formData.amount) };
      update = { points: Number(formData.points) };
    } else if (formData.type === 'actions') {
      identifier = { action: formData.action };
      update = { points: Number(formData.points) };
    }

    try {
      // Send update request to backend
      const response = await demandAxios.put('/loyalty/update-condition', {
        type: formData.type,
        identifier,
        update
      });

      // Call onSubmit with updated config from the response
      onSubmit(response.data.config);
      onClose();
    } catch (error) {
      console.error('Error updating condition:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="loyalty-set-up-popup-overlay">
      <div className="loyalty-set-up-popup">
        <h2>Update Condition</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="loyalty-set-up-form-group">
            <label><h6>Rule Type:</h6></label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="purchasing">Purchasing</option>
              <option value="actions">Action</option>
            </select>
          </div>

          {formData.type === 'purchasing' && (
            <>
              <div className="loyalty-set-up-form-group">
                <label><h6>Amount:</h6></label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {formData.type === 'actions' && (
            <>
              <div className="loyalty-set-up-form-group">
                <label><h6>Action:</h6></label>
                <input
                  type="text"
                  name="action"
                  value={formData.action}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="loyalty-set-up-form-group">
            <label><h6>Points:</h6></label>
            <input
              type="number"
              name="points"
              value={formData.points}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="loyalty-set-up-btn btn-primary">Update</button>
          <button type="button" className="loyalty-set-up-btn btn-secondary" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateLoyaltyConditionPopup;
