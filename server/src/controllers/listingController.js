import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../models/listingModel.js";
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
  const owner_id = req.user.id;
  console.log("owner_id:", owner_id);
  
  try {
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
      owner_id,
    );
    if (!newListing) {
      return res.status(400).json({ message: "Failed to create listing" });
    }
    return res
      .status(201)
      .json({ message: "Listing created successfully", listing: newListing });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});
// Get all listings with optional filters
export const getListingsController = asyncHandler(async (req, res) => {
  const filters = {
    city: req.query.city || undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    gender: req.query.gender || undefined,
  };
  try {
    const listings = await getAllListings(filters);
    if (listings.length === 0) {
      return res.status(200).json({
        message: "No listings yet.",
        listings: [],
      });
    }
    return res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});
// Get listing by ID
export const getListingByIdController = asyncHandler(async (req, res) => {
  const {id} = req.params;
  console.log("PARAM ID:", id);
  console.log("REQ PARAMS:", req.params);
  
  try {
    const listing = await getListingById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    return res.status(200).json({ success: true, data: listing });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});
// Update listing by ID
export const updateListingController = asyncHandler(async (req, res) => {
  const listingId = req.params.id;
  const updates = req.validateData;
  const userid = req.user.userid;

  if (!listingId) {
    return res.status(400).json({ message: "Listing ID is required" });
  }
  try {
    const listing = await getListingById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    // مالك سكن
    if (listing.owner_id !== req.user.userid) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this listing" });
    }
    const updatedListing = await updateListing(listingId, updates);
    if (!updatedListing) {
      return res.status(404).json({ message: "Failed to update listing" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Updated Successfully", data: updatedListing });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
// Delete listing by ID
export const deleteListingController = asyncHandler(async (req, res) => {
  const listingId = req.params.id;
  const owner_id = req.user.userid;
  try {
    if (!listingId) {
      return res.status(400).json({ message: "Listing ID is required"});
    }
    const deletedListing =  await deleteListing(listingId, owner_id);
    if (!deletedListing || deletedListing === 0){
        return res.status(403).json({ 
        message: "Failed to delete: Listing not found or you are not the owner" 
      });
    }
    return res.status(200).json({ message: "Deleted Successfully " });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
