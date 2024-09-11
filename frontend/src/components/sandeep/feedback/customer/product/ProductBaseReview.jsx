
import React, { useEffect, useState } from 'react'
import demandAxios from '../../../../../BaseURL';
import './productBaseReview.css'

function ProductBaseReview({ productId }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await demandAxios.get('/reviews/661ed1c2ba2e882298ce303c');
          setReviews(response.data);
        } catch (error) {
          console.error('Error fetching reviews', error);
        }
      };
  
      fetchReviews();
    }, [productId]);
  
    return (
      <div className="review-product-list container">
        <h3 className="review-product-title mb-4">Customer Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-product-item card mb-3">
              <div className="card-body">
                <p className="review-product-rating mb-2">
                  <strong>Rating:</strong> {review.rating}
                </p>
                <p className="review-product-comment mb-2">
                  <strong>Comment:</strong> {review.comment}
                </p>
                <p className="review-product-user">
                  <strong>Submitted by:</strong> {review.userId.name}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="review-product-no-reviews">No reviews yet for this product.</p>
        )}
      </div>
    );
}

export default ProductBaseReview