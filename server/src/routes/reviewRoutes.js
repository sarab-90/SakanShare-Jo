import { 
    addReviewController, 
    getUserReviewsController ,
    getUserRatingStatsController
} from "../controllers/reviewController.js";
import { protect } from "../middleware/protectMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { reviewSchema } from "../validation/reviewsValidation.js";
import { validate } from "../middleware/validateMiddleware.js";

import express from "express";
const router = express.Router();

router.post("/add", protect, authorizeRoles("user", "landlord"), validate(reviewSchema) ,addReviewController);

router.get("/user/:id", protect, authorizeRoles("admin", "user", "landlord"), getUserReviewsController);

// Get average rating and total reviews count for a user
router.get("/user/stats/:id", protect, authorizeRoles("admin", "user", "landlord"), getUserRatingStatsController);

export default router;