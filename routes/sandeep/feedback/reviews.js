const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsByProduct,
  getReviewsByUser,
  updateReview,
  getAllReviews,
  deleteReview
} = require('../../../controllers/sandeep/feedback/reviewsController');

// POST: Create a new review with image upload
router.post('/add', createReview);

// GET: Fetch all reviews for a specific product
router.get('/:productId', getReviewsByProduct);

// GET: Fetch all reviews (Admin Route)
router.get('/', getAllReviews); // New route for fetching all reviews

// GET: Fetch all reviews for a specific user
router.get('/user/:userId', getReviewsByUser);

// PUT: Update a review with optional image upload
router.put('/update/:reviewId', updateReview);

// DELETE: Delete a review
router.delete('/delete/:reviewId', deleteReview);

module.exports = router;
