const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsByProduct,
  getReviewsByUser,
  updateReview,
  deleteReview
} = require('../../../controllers/sandeep/feedback/reviewsController');

// POST: Create a new review
router.post('/add', createReview);

// GET: Fetch all reviews for a specific product
router.get('/:productId', getReviewsByProduct);

// GET: Fetch all reviews for a specific product
router.get('/user/:userId', getReviewsByUser);



// PUT: Update a review
router.put('/update/:reviewId', updateReview);

// DELETE: Delete a review
router.delete('/delete/:reviewId', deleteReview);

module.exports = router; 
