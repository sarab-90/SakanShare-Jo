import { createNewListing, getListingsController, getListingByIdController, updateListingController, deleteListingController } from "../controllers/listingController.js";
import { listingSchema, updateListingSchema } from "../validation/listingValidation.js";
import { validate } from "../middleware/validateMiddleware.js";
import { protect } from "../middleware/protectMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

import express from "express";
const router = express.Router();

router.post("/listings", protect, authorizeRoles("admin", "landlord"), validate(listingSchema), createNewListing);
router.get("/listings", getListingsController);
router.get("/listings/:id", getListingByIdController);
router.put("/listings/:id", protect, authorizeRoles("admin", "landlord"), validate(updateListingSchema), updateListingController);
router.delete("/listings/:id", protect, authorizeRoles("admin", "landlord"), deleteListingController);

export default router;