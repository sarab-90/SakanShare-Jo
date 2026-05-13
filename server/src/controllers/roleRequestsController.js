import {
  createRoleRequest,
  getAllRoleRequests,
  acceptRoleRequestModel,
  rejectRoleRequestModel,
  getRoleRequestById,
} from "../models/roleRequestsModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";

export const createRoleRequestController = asyncHandler(
  async (req, res) => {
    const user_id = req.user.userid;
    const { message, phone, city } = req.body;

    const request = await createRoleRequest(
      user_id,
      message,
      phone,
      city
    );
    res.status(201).json({
      success: true,
      request,
    });
  }
);

export const getAllRoleRequestsController = asyncHandler(
  async (req, res) => {
    const requests = await getAllRoleRequests();

    res.status(200).json({
      success: true,
      requests,
    });
  }
);
export const acceptRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const request = await getRoleRequestById(id);

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }
  await acceptRoleRequestModel(id, request.user_id);
  res.status(200).json({
    success: true,
    message: "Request accepted",
  });
});
export const rejectRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await rejectRoleRequestModel(id);

  res.status(200).json({
    success: true,
    message: "Request rejected",
  });
});