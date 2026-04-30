import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  deactivateUser,
} from "../models/userModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
// get all users
export const getAllUsersController = asyncHandler(async (req, res) => {
  try {    
    const users = await getAllUsers();
    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users found",
        users: [],
      });
    }
    return res.status(200).json({success: true, users});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});
// get user by id
export const getUserByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({success: true , user});

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
});
// get user by email
export const getUserByEmailController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({success : true , user});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user by email",
      error: error.message,
    });
  }
});
// update user
export const updateUserController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const updatedUser = await updateUser(
      id, 
      name,
      email,
      phone,
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating user details",
      error: error.message,
    });
  }
});
// delete user
export const deleteUserController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting user ",
      error: error.message,
    });
  }
});
// deactivate user
export const deactivateUserController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await deactivateUser(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User deactivated successfully",
    user,
  });
});

