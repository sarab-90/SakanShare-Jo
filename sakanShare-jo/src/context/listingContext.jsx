import api from "../services/api.js";
import toast from "react-hot-toast";
import { createContext, useState } from "react";

export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL LISTINGS
 const getListings = async () => {
  try {
    setLoading(true);

    const res = await api.get("/listings");

    const data = res?.data?.data || [];

    setListings([...data]); 
  } catch (error) {
    console.log(error);
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

      await getListings();

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Create failed");
    }
  };

// delete listing
const deleteListing = async (id) => {
  try {
    await api.delete(`/listings/${id})`);
    toast.success("Listing deleted successfully");
    await getListings();
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete failed");
  }
};
  return (
    <ListingContext.Provider
      value={{
        listings,
        loading,
        getListings,
        createListing,
        deleteListing,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};