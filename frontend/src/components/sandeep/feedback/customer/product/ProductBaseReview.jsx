import React, { useEffect, useState } from 'react';
import demandAxios from '../../../../../BaseURL'; // Make sure this import is correct
import './productBaseReview.css';

function ProductBaseReview({ productId }) {
  // State to hold the review summary and individual reviews
  const [reviewSummary, setReviewSummary] = useState({
    rating: 0,
    totalReviews: 0,
    distribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  });
  const [reviews, setReviews] = useState([]);

  // Fetch reviews when the component mounts or when productId changes
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await demandAxios.get(`/reviews/` + productId);
        const reviewData = response.data;
  
        // Initialize summary details
        let totalReviews = 0;
        let ratingSum = 0;
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
        // Map over the reviews and transform into the desired format
        const transformedReviews = reviewData.map(review => {
          // Count the distribution of ratings
          distribution[review.rating] += 1;
          
          // Add to total reviews and rating sum
          totalReviews += 1;
          ratingSum += review.rating;
  
          // Return the transformed review format
          return {
            username: review.userId.name, // Assuming userId is populated with name
            avatar: "https://randomuser.me/api/portraits/women/44.jpg", // Placeholder avatar, you can replace this with a real one if available
            title: review.title,
            review: review.comment,
            rating: review.rating
          };
        });
  
        // Calculate the average rating
        const averageRating = ratingSum / totalReviews;
  
        // Set the structured data
        setReviewSummary({
          rating: averageRating.toFixed(1), // Round to 1 decimal place
          totalReviews,
          distribution,
        });
  
        setReviews(transformedReviews);
  
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    };
  
    fetchReviews();
  }, [productId]);
  

  return (
    <div className="review-signal-product-container">
      <div className="review-signal-product-summary">
        <div className="review-signal-product-rating-overview">
          <h2 className="review-signal-product-rating">{reviewSummary.rating}</h2>
          <div className="review-signal-product-stars">
            <span>⭐⭐⭐⭐⭐</span>
          </div>
          <p className="review-signal-product-total-reviews">
            ({reviewSummary.totalReviews} Reviews)
          </p>
        </div>

        <div className="review-signal-product-rating-distribution">
          {Object.keys(reviewSummary.distribution).map((rating) => (
            <div className="review-signal-product-distribution-row" key={rating}>
              <span>{rating} ★</span>
              <div className="review-signal-product-bar-background">
                <div
                  className="review-signal-product-bar-fill"
                  style={{
                    width: `${(reviewSummary.distribution[rating] / reviewSummary.totalReviews) * 100}%`,
                  }}
                ></div>
              </div>
              <span>{reviewSummary.distribution[rating]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="review-signal-product-reviews">
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews available for this product.</p>
        ) : (
          reviews.map((review, index) => (
            <div className="review-signal-product-review-card" key={index}>
              <img
                src={review.avatar || 'https://via.placeholder.com/150'}
                alt={review.username}
                className="review-signal-product-avatar"
              />
              <div className="review-signal-product-review-content">
                <h4>{review.username}</h4>
                <span className="review-signal-product-stars">{'⭐'.repeat(review.rating)}</span>
                <h5 className="review-signal-product-title">{`"${review.title}"`}</h5>
                <p className="review-signal-product-description">{review.review}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductBaseReview;
