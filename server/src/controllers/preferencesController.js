import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
import {
  createPreferences,
  getPreferencesByUserId,
  updatePreferences,
} from "../models/preferencesModel.js";

export const createUserPreferences = asyncHandler(async (req, res) => {
  const userid = req.user.userid;
  const data = req.validateData;

  const existing = await getPreferencesByUserId(userid);

  if (existing) {
    return res.status(409).json({

      success: false,
      message: "Preferences already exist",
    });
  }
  const newPref = await createPreferences(
    userid,
    data.gender,
    data.min_age,
    data.max_age,
    data.smoking,
    data.sleep_time,
    data.cleanliness,
    data.noise_tolerance,
    data.pets_allowed,
    data.guest_policy,
    data.additional_notes,
    data.budget,
    data.city,
    data.preferred_room_type,
    data.furnished
  );
  return res.status(201).json({
    success: true,
    data: newPref,
  });
});

export const getUserPreferences = asyncHandler(async (req, res) => {
 const userid = req.user.userid;

  const data = await getPreferencesByUserId(userid);
  console.log("USER ID:", req.user);

  return res.status(200).json({
    success: true,
    data,
  });
});

export const updateUserPreferences = asyncHandler(async (req, res) => {
  const userid = req.user.userid;
  const data = req.validateData; 

  const updated = await updatePreferences(userid, data);

  if (!updated) {
    const newPref = await createPreferences(
      userid,
      data.gender,
      data.min_age,
      data.max_age,
      data.smoking,
      data.sleep_time,
      data.cleanliness,
      data.noise_tolerance,
      data.pets_allowed,
      data.guest_policy,
      data.additional_notes,
      data.budget,
      data.city,
      data.preferred_room_type,
      data.furnished
    );

    return res.status(201).json({
      success: true,
      message: "Preferences created successfully",
      data: newPref,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Preferences updated successfully",
    data: updated,
  });
});

export const getPreferencesStats = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      total: Number(total),
      smoking,
      avgBudget,
      gender,
    },
  });
});