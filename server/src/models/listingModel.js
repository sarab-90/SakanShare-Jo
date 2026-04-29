import { pool } from "../config/db.js";
// create a new listing
export const createListing = async (
    title,
    description,
    city,
    area,
    price,
    images,
    currency,
    is_shared,
    rooms_count,
    bathrooms_count,
    furnished,
    has_wifi,
    has_parking,
    has_kitchen,
    has_washing_machine,
    max_occupants,
    gender_allowed,
    latitude,
    longitude,
    is_available,
    owner_id
) => {
    const query = `INSERT INTO shared_housing 
    (title, description, city, area, price, images, currency, is_shared, rooms_count, bathrooms_count, furnished, has_wifi, has_parking, has_kitchen, has_washing_machine, 
    max_occupants, gender_allowed, latitude, longitude, is_available, owner_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *`;
    const result = await pool.query(query, [
        title,
        description,
        city,
        area,
        price,  
        images,
        currency,
        is_shared,
        rooms_count,
        bathrooms_count,
        furnished,
        has_wifi,
        has_parking,
        has_kitchen,
        has_washing_machine,
        max_occupants,
        gender_allowed,
        latitude,
        longitude,
        is_available,
        owner_id
    ]);
    return result.rows[0];
    };
    // get all listings
export const getAllListings = async () => {
  const result = await pool.query(`
    SELECT sh.*, u.name as owner_name, u.phone as owner_phone
    FROM shared_housing sh
    JOIN users u ON sh.owner_id = u.userid
    WHERE sh.is_available = true
    ORDER BY sh.created_at DESC
  `);

  return result.rows;
};
// get listing by id
export const getListingById = async (id) => {
  const result = await pool.query(
    `SELECT sh.*, u.name as owner_name, u.phone as owner_phone
     FROM shared_housing sh
     JOIN users u ON sh.owner_id = u.userid
     WHERE sh.listing_id = $1`,
    [id]
  );
  return result.rows[0];
};
// update listing 
export const updateListing = async (
  id,
  title,
  description,
  city,
  area,
  price,
  images,
  currency,
  is_shared,
  rooms_count,
  bathrooms_count,
  furnished,
  has_wifi,
  has_parking,
  has_kitchen,
  has_washing_machine,
  max_occupants,
  gender_allowed,
  latitude,
  longitude,
  is_available
) => {
  const result = await pool.query(
    `UPDATE shared_housing SET
      title = $1,
      description = $2,
      city = $3,
      area = $4,
      price = $5,
      images = $6,
      currency = $7,
      is_shared = $8,
      rooms_count = $9,
      bathrooms_count = $10,
      furnished = $11,
      has_wifi = $12,
      has_parking = $13,
      has_kitchen = $14,
      has_washing_machine = $15,
      max_occupants = $16,
      gender_allowed = $17,
      latitude = $18,
      longitude = $19,
      is_available = $20
    WHERE listing_id = $21
    RETURNING *`,
    [
      title,
      description,
      city,
      area,
      price,
      images,
      currency,
      is_shared,
      rooms_count,
      bathrooms_count,
      furnished,
      has_wifi,
      has_parking,
      has_kitchen,
      has_washing_machine,
      max_occupants,
      gender_allowed,
      latitude,
      longitude,
      is_available,
      id,
    ]
  );

  return result.rows[0];
};
// delete listing
export const deleteListing = async (id, owner_id) => {
  const result = await pool.query(
    `UPDATE shared_housing
     SET is_available = false
     WHERE listing_id = $1 AND owner_id = $2
     RETURNING *`,
    [id, owner_id]
  );

  return result.rows[0];
};