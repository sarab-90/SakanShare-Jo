import {
  createPreferences,
  getPreferencesByUserId,
  updatePreferences,
} from "../models/preferencesModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
//create preferences
export const createUserPreferences = asyncHandler(async (req, res) => {
  const {
    gender,
    min_age,
    max_age,
    smoking,
    sleep_time,
    cleanliness,
    noise_tolerance,
    pets_allowed,
    guest_policy,
    additional_notes,
    budget,
  } = req.validateData;
  const userid = req.user.userid;
  try {
    const existingPreferences = await getPreferencesByUserId(userid);
    if (existingPreferences) {
      return res
        .status(409)
        .json({ message: "Preferences already exist. Use update instead" });
    }
    const newPreferences = await createPreferences(
      userid,
      gender,
      min_age,
      max_age,
      smoking,
      sleep_time,
      cleanliness,
      noise_tolerance,
      pets_allowed,
      guest_policy,
      additional_notes,
      budget,
    );
    if (!newPreferences) {
      return res.status(400).json({ message: "Failed to create preferences" });
    }
    return res
      .status(201)
      .json({
        message: "Preferences created successfully",
        preferences: newPreferences,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
// get preferences
export const getUserPreferences = asyncHandler(async (req, res) => {
  const userid = req.user.userid;
  try {
    const preferences = await getPreferencesByUserId(userid);
    if (!preferences) {
      return res.status(404).json({ message: "No preferences found for this user" });
    }
    return res.status(200).json({
      success: true,
      data: preferences,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
// update preferences
export const updateUserPreferences = asyncHandler(async (req, res) => {
    const updates = req.validateData;
    const userid = req.user.userid;
    try {
        const existingPreferences = await getPreferencesByUserId(userid);
        if (!existingPreferences) {
            return res.status(404).json({ message: "You need to create preferences first" });
        }
        const updatedPreferences = await updatePreferences(userid, updates);
        if (!updatedPreferences) {
            return res.status(404).json({ message: "Preferences not found" });
        }
        return res.status(200).json({
            message: "Preferences updated successfully",
            preferences: updatedPreferences,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });

    }
});