import React, { useState,  useContext, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import 'bootstrap/dist/css/bootstrap.min.css';
import './customerReviews.css'; // External CSS for styling
import { AuthContext } from '../../../../context/AuthContext';
import demandAxios from '../../../../BaseURL';

function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  
  // Getting the user from the AuthContext
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Ensure that the effect only runs if `user` is available
    if (!user || !user._id) {
      return;
    }

    const fetchCustomerReviews = async () => {
      try {
        // Make an API call to fetch reviews by user ID
        console.log(user._id)
        const response = await demandAxios.get(`/reviews/user/` + user._id);
        setReviews(response.data); // Set the fetched reviews in state
        console.log(response.data)
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to fetch reviews. Please try again later.');
      }
    };

    fetchCustomerReviews();
  }, [user]);

  const handleEdit = (reviewId) => {
    // Handle edit review logic here
    console.log(`Editing review with ID: ${reviewId}`);
    // Redirect to edit form or show modal
  };

  const handleDelete = async (reviewId) => {
    try {
      // Call the delete API to remove the review from the database
      await demandAxios.delete(`/reviews/delete/${reviewId}`);
      // Remove the review from state after successful deletion
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (err) {
      console.error('Error deleting review:', err);
      setError('Failed to delete review. Please try again later.');
    }
  };

  return (
    <div className="customer-reviews-container">
      <h3 className="customer-reviews-title">Your Reviews</h3>

      {error && <p className="error-message">{error}</p>}
      
      {reviews.length === 0 ? (
        <p className="customer-reviews-empty">You have not submitted any reviews yet.</p>
      ) : (
        <div className="customer-reviews-list">
          {reviews.map((review, index) => (
            <div key={index} className="customer-review-card">
              <h5 className="customer-review-product">
                {review.productName} (Product ID: {review.productId})
              </h5>
              <p className="customer-review-rating">Rating: {review.rating} / 5</p>
              <p className="customer-review-comment">"{review.comment}"</p>
              <p className="customer-review-date">
                Reviewed on: {new Date(review.date).toLocaleDateString()}
              </p>

              {/* Edit and Delete buttons */}
              <div className="customer-review-actions">
                <button 
                  className="btn btn-warning btn-sm customer-review-edit-btn" 
                  onClick={() => handleEdit(review._id)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm customer-review-delete-btn" 
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerReviews;
