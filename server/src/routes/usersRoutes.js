import { 
    getAllUsersController, 
    getUserByIdController,
    getUserByEmailController,
    deleteUserController,
    updateUserController
} from "../controllers/userController.js";
import { protect } from "../middleware/protectMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

import express from "express";
const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), getAllUsersController);
router.get("/users/:id", protect, authorizeRoles("admin"), getUserByIdController);
router.get("/users/email", protect, authorizeRoles("admin"), getUserByEmailController);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUserController);
router.put("/users/:id", protect, authorizeRoles("admin"), updateUserController);
