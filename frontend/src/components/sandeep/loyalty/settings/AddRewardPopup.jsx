import React, { useState } from 'react';

function AddRewardPopup({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    pointsRequired: '',
    category: 'Percentage Discount',
    minPoints: 0,
    maxPoints: '',
    discountValue: '',
    imageFile: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imageFile: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rewardData = new FormData();
    rewardData.append('name', formData.name);
    rewardData.append('pointsRequired', formData.pointsRequired);
    rewardData.append('category', formData.category);
    rewardData.append('minPoints', formData.minPoints);
    rewardData.append('maxPoints', formData.maxPoints);

    console.log(formData.category)
    console.log(formData.pointsRequired)
    console.log(formData.minPoints)
    console.log(formData.maxPoints)
    console.log(formData.name)
    console.log(formData.discountValue)
    console.log(formData.imageFile)
    if (formData.discountValue) {
      rewardData.append('discountValue', formData.discountValue);
    }
    
    if (formData.imageFile) {
      rewardData.append('image', formData.imageFile);
    }

    onSubmit(rewardData);
    onClose();
  };

  return (
    <div className="loyalty-add-c-popup-overlay">
      <div className="loyalty-add-c-popup">
        <h2>Add a New Reward</h2>
        <form onSubmit={handleSubmit}>
          <div className="loyalty-add-c-form-group">
            <label>Reward Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="loyalty-add-c-form-group">
            <label>Points Required:</label>
            <input type="number" name="pointsRequired" value={formData.pointsRequired} onChange={handleChange} required />
          </div>

          <div className="loyalty-add-c-form-group">
            <label>Category:</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="Percentage Discount">Percentage Discount</option> {/* Corrected */}
            <option value="Flat Reduction">Flat Reduction</option> {/* Corrected */}
            <option value="Free Shipping">Free Shipping</option>
            </select>
          </div>

          <div className="loyalty-add-c-form-group">
            <label>Availability Range:</label>
            <div>
              <label>Min Points:</label>
              <input type="number" name="minPoints" value={formData.minPoints} onChange={handleChange} required />
            </div>
            <div>
              <label>Max Points:</label>
              <input type="number" name="maxPoints" value={formData.maxPoints} onChange={handleChange} required />
            </div>
          </div>

          <div className="loyalty-add-c-form-group">
            <label>Discount Value:</label>
            <input
              type="number"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleChange}
              placeholder="Enter discount value (e.g., percentage or flat amount)"
              required
            />
          </div>

          <div className="loyalty-add-c-form-group">
            <label>Upload Badge or Logo:</label>
            <input type="file" name="image" onChange={handleImageChange} />
          </div>

          <button type="submit" className="loyalty-add-c-btn btn-primary">Submit</button>
          <button type="button" className="loyalty-add-c-btn btn-secondary" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddRewardPopup;
