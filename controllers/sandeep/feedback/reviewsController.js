const Review = require('../../../models/sandeep/feedback/Review');
const mongoose = require('mongoose');

// Create a new review
exports.createReview = async (req, res) => {
  const { userId, productId, rating, comment } = req.body;

  try {
    const newReview = new Review({
      userId,
      productId,
      rating,
      comment
    });

    // Optionally perform sentiment analysis here and set `sentimentScore`

    await newReview.save();
    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error });
  }
};

// Get reviews by product ID
exports.getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId });//.populate('userId', 'name'); 
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};


// Get reviews by user ID
exports.getReviewsByUser = async (req, res) => {
  console.log('route')
  const { userId } = req.params;

  try {
    console.log(userId)
    const reviews = await Review.find({ userId });//.populate('userId', 'name'); 
    res.status(200).json(reviews);
    console.log(reviews)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.rating = rating;
    review.comment = comment;

    // Optionally perform sentiment analysis again if the comment changes

    await review.save();
    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};
