import { 
    getAllUsersController, 
    getUserByIdController,
    getUserByEmailController,
    deleteUserController,
    updateUserController,
    deactivateUserController,
    completeOnboarding,
    getPublicProfileController,
} from "../controllers/userController.js";
import { protect } from "../middleware/protectMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

import express from "express";
const router = express.Router();

router.get("/users", protect, authorizeRoles("admin", "user"), getAllUsersController);
router.get("/users/:id", protect, authorizeRoles("admin"), getUserByIdController);
router.get("/users/:email", protect, authorizeRoles("admin"), getUserByEmailController);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUserController);
router.put("/users/:id", protect, authorizeRoles("admin", "user", "landlord"), updateUserController);
router.patch("/users/deactivate/:id", protect, authorizeRoles("admin"), deactivateUserController);
router.patch("/users/onboarding", protect, completeOnboarding);
router.get("/users/public/:id", protect ,  getPublicProfileController);

export default router;