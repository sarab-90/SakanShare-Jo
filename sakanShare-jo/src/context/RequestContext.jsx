import { createContext, useState } from "react";
import api from "../services/api.js";
import toast from "react-hot-toast";

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL REQUESTS
  const getAllRequests = async () => {
    try {
      setLoading(true);

      const res = await api.get("/request/all");
     
      setRequests(res.data.requests || []);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  // APPROVE REQUEST
  const approveRequest = async (id) => {
    try {
      await api.put(`/request/accept/${id}`);

      toast.success("Request approved");

      await getAllRequests();
    } catch (error) {
      console.log(error);

      toast.error("Approve failed");
    }
  };

  // REJECT REQUEST
  const rejectRequest = async (id) => {
    try {
      await api.put(`/request/reject/${id}`);

      toast.success("Request rejected");

      await getAllRequests();
    } catch (error) {
      console.log(error);

      toast.error("Reject failed");
    }
  };
//
const markAsViewed = async (id) => {
  try {
    await api.put(`/request/view/${id}`);
    await getAllRequests();
  } catch (error) {
    console.log(error);
  }
};


  return (
    <RequestContext.Provider
      value={{
        requests,
        loading,
        getAllRequests,
        approveRequest,
        rejectRequest,
        markAsViewed,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};