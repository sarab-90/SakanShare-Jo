import {
  createMatchRequest,
  getSentMatchRequests,
  getReceivedMatchRequests,
  updateMatchRequestStatus,
  checkExistingRequest,
} from "../models/userMatchRequestModel.js";

import {
  createMatchRequestSchema,
  updateMatchRequestSchema,
} from "../validation/userMatchRequestValidation.js";

// CREATE REQUEST
export const sendMatchRequest = async (req, res) => {
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

    res.status(201).json({
      success: true,
      data: request,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SENT
export const getMySentMatchRequests = async (req, res) => {
  try {
    const userid = req.user.userid;

    const data = await getSentMatchRequests(userid);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET RECEIVED
export const getMyReceivedMatchRequests = async (req, res) => {
  try {
    const userid = req.user.userid;

    const data = await getReceivedMatchRequests(userid);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS
export const changeMatchRequestStatus = async (req, res) => {
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

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};