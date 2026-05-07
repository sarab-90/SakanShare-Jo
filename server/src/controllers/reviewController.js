import {
  createReview,
  getReviewsByUserId,
  getUserRatingStats,
} from "../models/reviewModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
import { reviewSchema } from "../validation/reviewsValidation.js";

// ADD REVIEW
export const addReviewController = asyncHandler(async (req, res) => {
  const { reviewed_user_id, rating, comment } = req.body;
  const reviewer_id = req.user.userid;
  // Prevent self-review
  if (reviewer_id === parseInt(reviewed_user_id)) {
    return res.status(400).json({
      success: false,
      message: "You cannot review your own profile",
    });
  }
  try {
    const review = await createReview(
      reviewer_id,
      reviewed_user_id,
      rating,
      comment,
    );
    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message:
          "You have already reviewed this user. You can only leave one review.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error submitting review",
      error: error.message,
    });
  }
});

// GET USER REVIEWS
export const getUserReviewsController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await getReviewsByUserId(id);
    if (reviews.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No reviews found for this user",
        reviews: [],
      });
    }
    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user reviews",
      error: error.message,
    });
  }
});
// GET USER RATING STATS (Average & Total)
export const getUserRatingStatsController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const stats = await getUserRatingStats(id);
    const finalStats = {
      total_reviews: parseInt(stats.total_reviews) || 0,
      avg_rating: parseFloat(stats.avg_rating) || 0.0,
    };

    return res.status(200).json({
      success: true,
      message: "Rating stats fetched successfully",
      stats: finalStats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching rating stats",
      error: error.message,
    });
  }
});
