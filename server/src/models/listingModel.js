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