import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './addReviewForm.css'
import demandAxios from '../../../../BaseURL';
import { AuthContext } from '../../../../context/AuthContext';

function AddReviewForm() {
  const [searchParams] = useSearchParams(); // Get the query params
  const productId = searchParams.get('productId'); // Extract productId from the URL
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [title, setTitle] = useState(''); // New state for the title

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await demandAxios.post('reviews/add', {
        userId: user._id, // Replace with actual logged-in user ID
        productId, // Use the productId from query params
        rating,
        title, // Include the title in the post request
        comment,
      });
      alert('Review submitted successfully!');
      setRating(5);
      setComment('');
      setTitle(''); // Reset the title after submission
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <form className="review-create-form p-4" onSubmit={handleSubmit}>
      <h3 className="review-create-title mb-4">Write a Review for Product ID: {productId}</h3>
      
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
      
      {/* Title Section */}
      <div className="form-group review-create-title-input mb-3">
        <label className="review-create-label">Title:</label>
        <input 
          type="text" 
          className="form-control review-create-input" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter a title for your review"
          required
        />
      </div>
      
      {/* Comment Section */}
      <div className="form-group review-create-comment mb-3">
        <label className="review-create-label">Comment:</label>
        <textarea 
          className="form-control review-create-textarea" 
          rows="4" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Write your review here..."
        />
      </div>
      
      {/* Submit Button */}
      <button type="submit" className="btn btn-primary review-create-btn">Submit Review</button>
    </form>
  );
}

export default AddReviewForm;
