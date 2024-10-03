import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './addReviewForm.css';
import demandAxios from '../../../../BaseURL';
import { AuthContext } from '../../../../context/AuthContext';

function AddReviewForm() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);

  // State for validation
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError('Title is required.');
      return false;
    }
    if (!comment.trim()) {
      setError('Comment is required.');
      return false;
    }
    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5.');
      return false;
    }
    if (images.length === 0) {
      setError('At least one image is required.');
      return false;
    }
    setError(''); // Clear error if all validations pass
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }

    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('productId', productId);
    formData.append('rating', rating);
    formData.append('title', title);
    formData.append('comment', comment);

    if (images.length > 0) {
      Array.from(images).forEach((image) => {
        formData.append('images', image);
      });
    }

    try {
      await demandAxios.post('reviews/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Review submitted successfully!');
      setRating(5);
      setComment('');
      setTitle('');
      setImages([]);
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <form className="review-create-form p-4" onSubmit={handleSubmit} encType="multipart/form-data">
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
        {error && !title && <span className="text-danger">{error}</span>}
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
        {error && !comment && <span className="text-danger">{error}</span>}
      </div>

      {/* Image Upload Section */}
      <div className="form-group review-create-images mb-3">
        <label className="review-create-label">Upload Images:</label>
        <input
          type="file"
          className="form-control review-create-file-input"
          onChange={handleImageChange}
          multiple
          accept="image/*"
        />
        {error && images.length === 0 && <span className="text-danger">{error}</span>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary review-create-btn">Submit Review</button>
    </form>
  );
}

export default AddReviewForm;
