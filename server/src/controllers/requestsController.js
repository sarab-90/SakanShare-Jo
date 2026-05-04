import {
  createRoommateRequest,
  getRequestsForOwner,
  checkExistingRequest,
  acceptRequest,
  getRequestById,
  rejectRequest,
  getMyRequests,
  getAllRequests,
  markRequestAsViewed,
} from "../models/requestsModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
import { getListingById } from "../models/listingModel.js";
import {getValidRequest} from "../middleware/requestGuard.js"

export const createRequestController = asyncHandler(async (req, res) => {
  const { listing_id, message } = req.validateData;
  const sender_id = req.user.userid;

  try {
    // check listing exists
    const listing = await getListingById(listing_id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    //prevent sending to yourself
    if (listing.owner_id === sender_id) {
      return res.status(400).json({
        message: "You cannot send request to your own listing",
      });
    }
    // duplicate request
    const existingRequest = await checkExistingRequest(sender_id, listing_id);
    if (existingRequest) {
      return res.status(400).json({
        message: "You already sent a request for this listing",
      });
    }
    //create request
    const newRequest = await createRoommateRequest(
      sender_id,
      listing_id,
      message,
    );
    return res.status(201).json({
      message: "Request sent successfully",
      request: newRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
//accept request
export const acceptRequestController = asyncHandler(async (req, res) => {
  const { request_id } = req.params;
  const owner_id = req.user.userid;

  try {
    const request = await getValidRequest(request_id, owner_id);
    const updatedRequest = await acceptRequest(request_id);

    return res.status(200).json({
      message: "Request accepted successfully",
      request: updatedRequest,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});
// rejected request
export const rejectRequestController = asyncHandler(async (req, res) => {
  const { request_id } = req.params;
  const owner_id = req.user.userid;

  try {
    const request = await getValidRequest(request_id, owner_id);

    const updatedRequest = await rejectRequest(request_id);

    return res.status(200).json({
      message: "Request rejected successfully",
      request: updatedRequest,
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});
// get Request for owner
export const getRequestsForOwnerController = asyncHandler(async (req, res) => {
    const owner_id = req.user.userid;

    try {
        const requests = await getRequestsForOwner(owner_id);
        if (requests.length === 0) {
            return res.status(200).json({
                message: "No requests found",
                requests: []
            });
        }
        return res.status(200).json({
            message: "Requests retrieved successfully",
            count: requests.length,
            requests
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});
// get My Requests
export const getMyRequestsController = asyncHandler(async (req, res) => {
    const sender_id = req.user.userid;
    try {
        const requests = await getMyRequests(sender_id);
        if (requests.length === 0) {
            return res.status(200).json({
                message: "You have no requests yet",
                requests: []
            });
        }
        return res.status(200).json({
            message: "Your requests retrieved successfully",
            count: requests.length,
            requests
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});
// GET ALL REQUESTS (ADMIN)
export const getAllRequestsController = asyncHandler(async (req, res) => {
  try {
    const requests = await getAllRequests();

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch requests",
      error: error.message,
    });
  }
});
//

export const markAsViewedController = asyncHandler(async (req, res) => {
  const { request_id } = req.params;

  try {
    const updated = await markRequestAsViewed(request_id);

    return res.status(200).json({
      success: true,
      message: "Request marked as viewed",
      request: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
