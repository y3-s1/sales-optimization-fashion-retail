import React, { useEffect, useState } from 'react';
import '../../../../pages/sandeep/customerRelationship.css';
import demandAxios from '../../../../BaseURL';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For table support in jsPDF

const Allreviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await demandAxios.get(`/reviews/`);
        console.log(response.data);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchAllReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (!confirmDelete) return;

    try {
      await demandAxios.delete(`/reviews/delete/${reviewId}`);
      setReviews(reviews.filter((review) => review._id !== reviewId));
      alert('Review deleted successfully!');
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete the review.');
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();

    doc.text('Reviews Report', 14, 20);
    
    const reviewData = reviews.map((review) => [
      review.userId.customer_name,
      review.productId.name,
      review.rating,
      review.title,
      review.comment,
      new Date(review.createdAt).toLocaleDateString(),
    ]);

    doc.autoTable({
      head: [['Customer', 'Product', 'Rating', 'Title', 'Comment', 'Date']],
      body: reviewData,
    });

    doc.save('reviews_report.pdf');
  };

  return (
    <div className="allreviews-container">
      <h1>All Reviews</h1>
      <button onClick={generateReport} className="generate-report-button">
        Generate Report
      </button>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Rating</th>
            <th>Title</th>
            <th>Comment</th>
            <th>Images</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.userId.customer_name}</td>
              <td>{review.productId.name}</td>
              <td>{review.rating}</td>
              <td>{review.title}</td>
              <td>{review.comment}</td>
              <td>
                {review.images && review.images.length > 0 ? (
                  review.images.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8070${img}`}
                      alt={`Review Image ${index}`}
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  ))
                ) : (
                  'No images'
                )}
              </td>
              <td>{new Date(review.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allreviews;
