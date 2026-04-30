import { getListingById } from "../models/listingModel.js";
import { getRequestById } from "../models/requestsModel.js";

export const getValidRequest = async (request_id, owner_id) => {
    const request = await getRequestById(request_id);
    if (!request) {
        throw new Error("Request not found");
    }
    
    const listing = await getListingById(request.listing_id);
    if (!listing) {
        throw new Error("Listing not found");
    }
    if (listing.owner_id !== owner_id) {
        throw new Error("Not authorized");
    }
    if (request.status !== "pending") {
        throw new Error("Request already processed");
    }
    return request;
};