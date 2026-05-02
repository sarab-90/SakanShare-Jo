// → إدارة جلب البيانات (get listings / create listing / delete)import { createContext, useState } from "react";
import api from "../services/api.js";
import toast from "react-hot-toast";

export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL LISTINGS
  const getListings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/listings");

      setListings(res.data.listings || res.data || []);
    } catch (error) {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  // CREATE LISTING
  const createListing = async (data) => {
    try {
      const res = await api.post("/listings", data);
      toast.success("Listing created successfully");

      // تحديث القائمة بعد الإنشاء
      await getListings();

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Create failed");
    }
  };

  return (
    <ListingContext.Provider
      value={{
        listings,
        loading,
        getListings,
        createListing,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};