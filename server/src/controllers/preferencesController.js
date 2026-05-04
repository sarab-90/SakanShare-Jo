import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";

import {
  createPreferences,
  getPreferencesByUserId,
  updatePreferences,
  getTotalPreferences,
  getSmokingStats,
  getAvgBudget,
  getGenderStats,
} from "../models/preferencesModel.js";

/* ================= USER ================= */

// CREATE
export const createUserPreferences = asyncHandler(async (req, res) => {
  const userid = req.user.userid;
  const data = req.validateData;

  const existing = await getPreferencesByUserId(userid);
  if (existing) {
    return res.status(409).json({ message: "Preferences already exist" });
  }

  const newPref = await createPreferences(userid, ...Object.values(data));

  return res.status(201).json({
    success: true,
    data: newPref,
  });
});

// GET
export const getUserPreferences = asyncHandler(async (req, res) => {
  const userid = req.user.userid;

  const data = await getPreferencesByUserId(userid);

  return res.status(200).json({
    success: true,
    data,
  });
});

// UPDATE
export const updateUserPreferences = asyncHandler(async (req, res) => {
  const userid = req.user.userid;

  const updated = await updatePreferences(userid, req.validateData);

  return res.status(200).json({
    success: true,
    data: updated,
  });
});

/* ================= ADMIN STATS ================= */

export const getPreferencesStats = asyncHandler(async (req, res) => {
  const total = await getTotalPreferences();
  const smoking = await getSmokingStats();
  const avgBudget = await getAvgBudget();
  const gender = await getGenderStats();

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