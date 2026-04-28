import { createListing } from "../models/listingModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
// Create a new listing
export const createNewListing = asyncHandler(async (req, res) => {
    const {
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
    } = req.validateData;
    const owner_id = req.user.userid;

    if (!title || !price || !owner_id) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const newListing = await createListing(
        title,
        description,
        city,
        area,
        price,
        images || [],
        currency || "JOD",
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
    );
    if (!newListing) {
        return res.status(400).json({ message: "Failed to create listing" });
    }
    return res
        .status(201)
        .json({ message: "Listing created successfully", listing: newListing });
});
