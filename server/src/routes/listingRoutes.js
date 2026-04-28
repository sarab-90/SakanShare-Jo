import { createNewListing } from "../controllers/listingController.js";
import { listingSchema } from "../validation/listingValidation.js";
import { validate } from "../middleware/validateMiddleware.js";
import { protect } from "../middleware/protectMiddleware.js";

import express from "express";
const router = express.Router();

router.post("/listing/create", protect, validate(listingSchema), createNewListing);

export default router;