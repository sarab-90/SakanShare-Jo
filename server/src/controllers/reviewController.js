import {
  createReview,
  getReviewsByUserId,
  getUserRatingStats,
  addReply,
  getTopRatedLandlords
} from "../models/reviewModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
import { reviewSchema } from "../validation/reviewsValidation.js";
import { insertNotification } from "../models/notificationModel.js";

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
    await insertNotification(
      reviewed_user_id,
      "review",
      `${req.user.name} gave you a ${rating}-star review`,
      `/profile/${reviewed_user_id}`,
    );
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

export const updateReviewReply = asyncHandler(async (req, res) => {
  const { reviewId } = req.params; 
  const { owner_reply } = req.body;
  const ownerId = req.user.userid; 

  try {
    const updatedReview = await addReply(reviewId, ownerId, owner_reply);

    if (!updatedReview) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, review: updatedReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
export const fetchTopLandlords = async (req, res) => {
  try {
    const landlords = await getTopRatedLandlords(4); // جلب أفضل 4 مالكين
    res.json({ success: true, landlords });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
