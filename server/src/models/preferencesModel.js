import {pool} from "../config/db.js";

// CREATE
export const createPreferences = async (
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
  budget
) => {
  const result = await pool.query(
    `INSERT INTO preferences 
    (userid, gender, min_age, max_age, smoking, sleep_time, cleanliness, noise_tolerance, pets_allowed, guest_policy, additional_notes, budget)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING *`,
    [
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
    ]
  );

  return result.rows[0];
};

// GET BY USER
export const getPreferencesByUserId = async (userid) => {
  const result = await pool.query(
    `SELECT * FROM preferences WHERE userid = $1`,
    [userid]
  );
  return result.rows[0];
};

// UPDATE
export const updatePreferences = async (userid, updates) => {
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
  } = updates;

  const result = await pool.query(
    `UPDATE preferences SET
      gender = COALESCE($1, gender),
      min_age = COALESCE($2, min_age),
      max_age = COALESCE($3, max_age),
      smoking = COALESCE($4, smoking),
      sleep_time = COALESCE($5, sleep_time),
      cleanliness = COALESCE($6, cleanliness),
      noise_tolerance = COALESCE($7, noise_tolerance),
      pets_allowed = COALESCE($8, pets_allowed),
      guest_policy = COALESCE($9, guest_policy),
      additional_notes = COALESCE($10, additional_notes),
      budget = COALESCE($11, budget)
    WHERE userid = $12
    RETURNING *`,
    [
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
      userid,
    ]
  );

  return result.rows[0];
};

/* ================= ADMIN STATS ================= */

export const getTotalPreferences = async () => {
  const result = await pool.query(`SELECT COUNT(*) FROM preferences`);
  return result.rows[0].count;
};

export const getSmokingStats = async () => {
  const result = await pool.query(`
    SELECT smoking, COUNT(*) 
    FROM preferences 
    GROUP BY smoking
  `);
  return result.rows;
};

export const getAvgBudget = async () => {
  const result = await pool.query(`
    SELECT AVG(budget) FROM preferences
  `);
  return result.rows[0].avg;
};

export const getGenderStats = async () => {
  const result = await pool.query(`
    SELECT gender, COUNT(*) 
    FROM preferences 
    GROUP BY gender
  `);
  return result.rows;
};