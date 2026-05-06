import {
  createMatchRequest,
  getSentMatchRequests,
  getReceivedMatchRequests,
  updateMatchRequestStatus,
  checkExistingRequest,
  getDiscoveryMatches,
} from "../models/userMatchRequestModel.js";
import {asyncHandler} from "../middleware/asyncHandlerMiddleware.js"
import {
  createMatchRequestSchema,
  updateMatchRequestSchema,
} from "../validation/userMatchRequestValidation.js";
// CREATE REQUEST
export const sendMatchRequest = asyncHandler( async (req, res) => {
  try {
    const sender_id = req.user.userid;

    const { error } = createMatchRequestSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { receiver_id, message } = req.body;

    if (sender_id === receiver_id) {
      return res.status(400).json({
        message: "You cannot send request to yourself",
      });
    }
    // check duplicate
    const existing = await checkExistingRequest(sender_id, receiver_id);
    if (existing) {
      return res.status(400).json({
        message: "Request already sent",
      });
    }
    const request = await createMatchRequest(
      sender_id,
      receiver_id,
      message
    );
    return res.status(201).json({
      success: true,
      data: request,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
// GET SENT
export const getMySentMatchRequests = asyncHandler( async (req, res) => {
  try {
    const userid = req.user.userid;

    const data = await getSentMatchRequests(userid);

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
// GET RECEIVED
export const getMyReceivedMatchRequests = asyncHandler(async (req, res) => {
  try {
    const userid = req.user.userid;

    const data = await getReceivedMatchRequests(userid);

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
// UPDATE STATUS
export const changeMatchRequestStatus = asyncHandler(async (req, res) => {
  try {
    const { request_id } = req.params;

    const { error } = updateMatchRequestSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { status } = req.body;
    const updated = await updateMatchRequestStatus(request_id, status);
    if (!updated) {
      return res.status(404).json({
        message: "Request not found",
      });
    }
    return res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export const getMatchesController = asyncHandler(async (req, res) => {
  const userId = req.user.userid;

  try {
    const matches = await getDiscoveryMatches(userId);
    
    return res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error calculating matches",
      error: error.message
    });
  }
});

