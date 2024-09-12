import React, { useState } from 'react'

function AddLoyaltyPopup({ onClose, onSubmit }) {
    const [formData, setFormData] = useState({ type: 'purchasing', amount: '', points: '', action: '' });

    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Structure the form data as required
        let condition = {};
        if (formData.type === 'purchasing') {
          condition = { amount: Number(formData.amount), points: Number(formData.points) };
        } else if (formData.type === 'actions') {
          condition = { action: formData.action, points: Number(formData.points) };
        }
    
        const structuredData = {
          type: formData.type,
          conditions: [condition] // Wrap the condition in an array
        };
    
        onSubmit(structuredData); // Pass the structured data to the parent component
        onClose(); // Close the popup after submission
      };
  
    return (
      <div className="loyalty-add-c-popup-overlay">
        <div className="loyalty-add-c-popup">
          <h2>Add a New Condition</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="loyalty-add-c-form-group">
              <label><h6>Rule Type:</h6></label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="purchasing">Purchasing</option>
                <option value="actions">Action</option>
              </select>
            </div>
  
            {formData.type === 'purchasing' && (
              <>
                <div className="loyalty-add-c-form-group">
                  <label><h6>Amount:</h6></label>
                  <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
                </div>
              </>
            )}
  
            {formData.type === 'actions' && (
              <>
                <div className="loyalty-add-c-form-group">
                  <label><h6>Action:</h6></label>
                  <input type="text" name="action" value={formData.action} onChange={handleChange} required />
                </div>
              </>
            )}
  
            <div className="loyalty-add-c-form-group">
              <label><h6>Points:</h6></label>
              <input type="number" name="points" value={formData.points} onChange={handleChange} required />
            </div>
  
            <button type="submit" className="loyalty-add-c-btn btn-primary">Submit</button>
            <button type="button" className="loyalty-add-c-btn btn-secondary" onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    );
}

export default AddLoyaltyPopup