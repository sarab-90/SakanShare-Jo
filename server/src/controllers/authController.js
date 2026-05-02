import { createUser, changePassword, saveRefreshToken } from "../models/authModel.js";
import { verifyRefreshToken } from "../../utils/tokensUtils.js";
import { generateTokens } from "../../utils/tokensUtils.js";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../../utils/cookiesUtils.js";
import { getUserByEmail, getUserById } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";

// Register a new user
export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.validateData;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashed_password = await bcrypt.hash(password, 10);
  const newUser = await createUser(
    name,
    email,
    phone,
    hashed_password,
    "user",
    true,
  );
  if (!newUser) {
    return res.status(400).json({ message: "Failed to create user" });
  }
  return res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});
// Login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validateData;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not register, please register first" });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);
    // حفظ refresh token في DB
    await saveRefreshToken(user.userid, refreshToken);

    // Set cookies
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    // Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        userid: user.userid,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
// Logout user
export const logout = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No refresh token provided",
      });
    }
    const decoded = verifyRefreshToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    await saveRefreshToken(decoded.id, null);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
});
// current user
export const currentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "Current user retrieved successfully",
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (error) {
    console.log(" Error fetching current user:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
// change password
export const changePasswordController = asyncHandler(async (req, res) => {
  const userId = req.user.userid;
    const { oldPassword, newPassword, confirmNewPassword } = req.validateData;
  try {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //check match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }
    //get user
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // check old password
    const isMatch = await bcrypt.compare(
      oldPassword,
      user.hashed_password
    );
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }
    //hash new password
    const hashed = await bcrypt.hash(newPassword, 10);
    // update password
    await changePassword(userId, hashed);

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Change password failed",
      error: error.message,
    });
  }
});
