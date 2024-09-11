
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './addReviewForm.css'
import demandAxios from '../../../../BaseURL';

function AddReviewForm({ productId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await demandAxios.post('reviews/add', {
        userId: '65f7d71ac447f1c610d3b6c7', // Replace with actual logged-in user ID
        productId,
        rating,
        comment,
      });
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <form className="review-create-form p-4" onSubmit={handleSubmit}>
      <h3 className="review-create-title mb-4">Write a Review</h3>
      
      {/* Rating Section */}
      <div className="form-group review-create-rating mb-3">
        <label className="review-create-label">Rating:</label>
        <select 
          className="form-control review-create-select" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      
      {/* Comment Section */}
      <div className="form-group review-create-comment mb-3">
        <label className="review-create-label">Comment:</label>
        <textarea 
          className="form-control review-create-textarea" 
          rows="4" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
        />
      </div>
      
      {/* Submit Button */}
      <button type="submit" className="btn btn-primary review-create-btn">Submit Review</button>
    </form>
  );
}

export default AddReviewForm;
