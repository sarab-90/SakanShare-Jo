import api from "../services/api.js";
import toast from "react-hot-toast";
import { createContext, useState } from "react";

export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getListings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/listings");
     
      setListings(res?.data?.data || res?.data?.listings || []);
    } catch (error) {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (data) => {
    try {
      await api.post("/listings", data);
      toast.success("Listing created successfully");
      await getListings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Create failed");
    }
  };
  const updateListing = async (id, data) => {
    try {
      console.log("Cleaning data for update...");

      // 1. استخراج الحقول المرفوضة من قبل الباكند لضمان عدم إرسالها
      // أضفنا owner_id و owner_phone و current_occupants و listing_id بناءً على خطأ الكونسول
      const { 
        listing_id, 
        owner_id, 
        owner_name, 
        owner_phone, 
        current_occupants, 
        created_at, 
        updated_at,
        ...cleanData 
      } = data;

      // 2. تحويل القيم الرقمية لضمان المطابقة مع الـ Validator
      const finalData = {
        ...cleanData,
        price: Number(cleanData.price),
        area: String(cleanData.area),
        rooms_count: Number(cleanData.rooms_count),
        bathrooms_count: Number(cleanData.bathrooms_count),
        max_occupants: Number(cleanData.max_occupants),
        is_available: Boolean(cleanData.is_available)
      };

      const res = await api.put(`/listings/${id}`, finalData);
      
      toast.success("Listing updated successfully!");
      await getListings(); // تحديث الجدول
    } catch (error) {
      console.error("Update Error Info:", error.response?.data);
      // إظهار أول خطأ يرجعه الباكند للمستخدم
      const errorMsg = error.response?.data?.errors?.[0] || "Update failed";
      toast.error(errorMsg);
    }
  };

  const deleteListing = async (id) => {
    try {
      await api.delete(`/listings/${id}`);
      toast.success("Listing deleted successfully");
      await getListings();
    } catch (error) {
      console.error("Delete Error:", error.response?.data);
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
        updateListing,
        deleteListing,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};