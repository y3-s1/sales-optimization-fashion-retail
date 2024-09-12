import React, { useState } from 'react';

function AddRewardPopup({ onClose, onSubmit }) {
  // State to manage the form data
  const [formData, setFormData] = useState({
    name: '',
    pointsRequired: '',
    category: 'Discounts', // Default category
    minPoints: 0, // Default value for minPoints
    maxPoints: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const rewardData = {
      name: formData.name,
      pointsRequired: Number(formData.pointsRequired),
      category: formData.category,
      minPoints: Number(formData.minPoints),
      maxPoints: Number(formData.maxPoints)
    };
    
    onSubmit(rewardData); // Pass structured data to parent component
    onClose(); // Close the popup
  };

  return (
    <div className="loyalty-add-c-popup-overlay">
      <div className="loyalty-add-c-popup">
        <h2>Add a New Reward</h2>
        <br />
        <form onSubmit={handleSubmit}>
          {/* Reward Name */}
          <div className="loyalty-add-c-form-group">
            <label><h6>Reward Name:</h6></label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Points Required */}
          <div className="loyalty-add-c-form-group">
            <label><h6>Points Required:</h6></label>
            <input 
              type="number" 
              name="pointsRequired" 
              value={formData.pointsRequired} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Category */}
          <div className="loyalty-add-c-form-group">
            <label><h6>Category:</h6></label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              required
            >
              <option value="Discounts">Discounts</option>
              <option value="Free Shipping">Free Shipping</option>
              <option value="Free Product">Free Product</option>
            </select>
          </div>

          {/* Availability Range */}
          <div className="loyalty-add-c-form-group">
            <label><h6>Availability Range:</h6></label>
            <div>
              <label>Min Points:</label>
              <input 
                type="number" 
                name="minPoints" 
                value={formData.minPoints} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label>Max Points:</label>
              <input 
                type="number" 
                name="maxPoints" 
                value={formData.maxPoints} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <button type="submit" className="loyalty-add-c-btn btn-primary">Submit</button>
          <button type="button" className="loyalty-add-c-btn btn-secondary" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddRewardPopup;
