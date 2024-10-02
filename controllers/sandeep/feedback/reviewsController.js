const Review = require('../../../models/sandeep/feedback/Review');
const { awardPoints } = require('../../../utils/loyalty');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/reviews/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
}).array('images', 5); // Allow up to 5 images for a review

// Create a new review with image upload
exports.createReview = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError || err) {
      return res.status(500).json({ message: 'Error uploading images', error: err });
    }

    const { userId, productId, rating, title, comment } = req.body;
    const imagePaths = req.files ? req.files.map(file => `/uploads/reviews/${file.filename}`) : [];

    try {
      const newReview = new Review({
        userId,
        productId,
        rating,
        title,
        comment,
        images: imagePaths // Save image paths in the review document
      });

      await newReview.save();
      await awardPoints(userId, 'review');
      res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
      res.status(500).json({ message: 'Error creating review', error });
    }
  });
};

// Get reviews by product ID
exports.getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId }).populate('userId', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Get reviews by user ID
exports.getReviewsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const reviews = await Review.find({ userId }).populate('productId');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Update a review with optional image upload
exports.updateReview = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError || err) {
      return res.status(500).json({ message: 'Error uploading images', error: err });
    }

    const { reviewId } = req.params;
    const { rating, title, comment } = req.body;

    try {
      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      review.rating = rating;
      review.title = title;
      review.comment = comment;

      if (req.files && req.files.length > 0) {
        const imagePaths = req.files.map(file => `/uploads/reviews/${file.filename}`);
        review.images = imagePaths; // Update images array
      }

      await review.save();
      res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
      res.status(500).json({ message: 'Error updating review', error });
    }
  });
};

// Delete a review
exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.images && review.images.length > 0) {
      review.images.forEach(image => {
        const imagePath = path.join(__dirname, '../../../', image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete images from the server
        }
      });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};
