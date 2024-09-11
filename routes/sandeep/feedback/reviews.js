const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview
} = require('../../../controllers/sandeep/feedback/reviewsController');

// POST: Create a new review
router.post('/add', createReview);

// GET: Fetch all reviews for a specific product
router.get('/:productId', getReviewsByProduct);

// PUT: Update a review
router.put('/:reviewId', updateReview);

// DELETE: Delete a review
router.delete('/:reviewId', deleteReview);

module.exports = router; 
