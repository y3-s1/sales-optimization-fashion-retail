import React, { useState, useContext, useEffect } from 'react';
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
        const response = await demandAxios.get(`/reviews/user/` + user._id);
        console.log(response.data)
        setReviews(response.data); // Set the fetched reviews in state
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to fetch reviews. Please try again later.');
      }
    };

    fetchCustomerReviews();
  }, [user]);

  const handleEdit = (reviewId) => {
    console.log(`Editing review with ID: ${reviewId}`);
  };

  const handleDelete = async (reviewId) => {
    try {
      await demandAxios.delete(`/reviews/delete/${reviewId}`);
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
                {review.productId.name} (Product ID: {review.productId._id})
              </h5>
              <p className="customer-review-rating">Rating: {review.rating} / 5</p>
              <p className="customer-review-comment">"{review.comment}"</p>
              <p className="customer-review-date">
                Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
              </p>

              {/* Display images if available */}
              {review.images && review.images.length > 0 && (
                <div className="customer-review-images">
                  {review.images.map((image, i) => (
                    <img
                      key={i}
                      src={`http://localhost:8070${image}`} // Assuming the image is a URL
                      alt={`Review Image ${i + 1}`}
                      className="customer-review-image"
                    />
                  ))}
                </div>
              )}

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
