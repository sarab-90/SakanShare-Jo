import { createUser } from "../models/authModel.js";
import { getUserByEmail } from "../models/userModel.js";
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
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    return res
      .status(200)
      .json({
        message: "Login successful",
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});
// Logout user

