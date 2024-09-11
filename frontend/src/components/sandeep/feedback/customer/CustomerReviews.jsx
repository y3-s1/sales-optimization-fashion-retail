import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './customerReviews.css'; // External CSS for styling

function CustomerReviews({ customerId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews based on customerId (dummy data for now)
    const fetchCustomerReviews = async () => {
      // In real case, you'd fetch from an API like below
      // const response = await axios.get(`/reviews/customer/${customerId}`);
      // setReviews(response.data);
      
      // Dummy data for demonstration
      const dummyReviews = [
        {
          id: '1',
          productId: '1234',
          productName: 'Product 1',
          rating: 5,
          comment: 'Amazing product! Highly recommend.',
          date: '2023-01-15',
        },
        {
          id: '2',
          productId: '5678',
          productName: 'Product 2',
          rating: 4,
          comment: 'Very good, but could be improved.',
          date: '2023-03-21',
        },
        {
          id: '3',
          productId: '9101',
          productName: 'Product 3',
          rating: 3,
          comment: 'Average product, nothing special.',
          date: '2023-06-05',
        },
      ];
      setReviews(dummyReviews);
    };

    fetchCustomerReviews();
  }, [customerId]);

  const handleEdit = (reviewId) => {
    // Handle edit review logic here
    console.log(`Editing review with ID: ${reviewId}`);
    // Redirect to edit form or show modal
  };

  const handleDelete = (reviewId) => {
    // Handle delete review logic here
    console.log(`Deleting review with ID: ${reviewId}`);
    // Remove the review from state (in real app, you’d also call an API)
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  return (
    <div className="customer-reviews-container">
      <h3 className="customer-reviews-title">Your Reviews</h3>

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
              <p className="customer-review-date">Reviewed on: {new Date(review.date).toLocaleDateString()}</p>

              {/* Edit and Delete buttons */}
              <div className="customer-review-actions">
                <button 
                  className="btn btn-warning btn-sm customer-review-edit-btn" 
                  onClick={() => handleEdit(review.id)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm customer-review-delete-btn" 
                  onClick={() => handleDelete(review.id)}
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
