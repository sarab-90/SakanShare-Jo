import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, MenuItem, Box, Switch, FormControlLabel, Typography
} from "@mui/material";
import api from "../../services/api.js";
import toast from "react-hot-toast";

const initialState = {
  title: "", description: "", city: "", area: "", price: "",
  images: [], currency: "JOD", is_shared: true, rooms_count: 1,
  bathrooms_count: 1, furnished: false, has_wifi: true,
  has_parking: false, has_kitchen: true, has_washing_machine: false,
  max_occupants: 1, gender_allowed: "any", is_available: true, 
  latitude: "", 
  longitude: "",
};

export default function AddListingForm({ open, onClose, onSuccess, initialData }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        latitude: initialData.latitude ?? "",
        longitude: initialData.longitude ?? "",
      });
    } else {
      setFormData(initialState);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.value ? [e.target.value] : [] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  try {
    const dataToSubmit = {
      title: formData.title,
      description: formData.description,
      city: formData.city,
      area: formData.area,
      price: Number(formData.price),
      currency: formData.currency || "JOD",
      is_shared: Boolean(formData.is_shared),
      is_available: Boolean(formData.is_available),
      latitude: formData.latitude ? Number(formData.latitude) : 0,
      longitude: formData.longitude ? Number(formData.longitude) : 0,
      images: Array.isArray(formData.images) ? formData.images : [formData.images],
      max_occupants: Number(formData.max_occupants) || 1,
      rooms_count: Number(formData.rooms_count) || 1,
      bathrooms_count: Number(formData.bathrooms_count) || 1,
      gender_allowed: formData.gender_allowed || "any",
      furnished: Boolean(formData.furnished),
      has_wifi: Boolean(formData.has_wifi),
      has_parking: Boolean(formData.has_parking),
      has_kitchen: Boolean(formData.has_kitchen),
      has_washing_machine: Boolean(formData.has_washing_machine),
    };

    console.log("Clean data sent to backend:", dataToSubmit);

    if (initialData) {
      await api.put(`/listings/${initialData.listing_id}`, dataToSubmit);
      toast.success("Listing updated successfully!");
    } else {
      await api.post("/listings", dataToSubmit);
      toast.success("Listing created successfully!");
    }

    onSuccess();
    onClose();
  } catch (err) {
    const errorMessage = err.response?.data?.errors?.[0] || err.response?.data?.message || "Server Error";
    console.error("Back-end Error Details:", err.response?.data);
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: 800 }}>
        {initialData ? "Edit Property Details" : "Add New Property"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Title" name="title" value={formData.title} required onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="City" name="city" value={formData.city} required onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Area" name="area" value={formData.area} required onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth type="number" label="Price (JOD)" name="price" value={formData.price} required onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth select label="Gender" name="gender_allowed" value={formData.gender_allowed} onChange={handleChange}>
                <MenuItem value="any">Any</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth type="number" label="Max Occupants" name="max_occupants" value={formData.max_occupants} onChange={handleChange} />
            </Grid>
            
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                type="number" 
                label="Latitude (Ex: 31.95)" 
                name="latitude" 
                value={formData.latitude} 
                onChange={handleChange} 
                helperText="Geographic latitude"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                fullWidth 
                type="number" 
                label="Longitude (Ex: 35.91)" 
                name="longitude" 
                value={formData.longitude} 
                onChange={handleChange} 
                helperText="Geographic longitude"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                fullWidth label="Image URL" 
                placeholder="https://..." 
                value={formData.images?.[0] || ""} 
                onChange={handleImageChange} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={3} label="Description" name="description" value={formData.description} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2, bgcolor: "#F1F5F9", borderRadius: 2 }}>
                <FormControlLabel control={<Switch name="has_wifi" checked={formData.has_wifi} onChange={handleChange} />} label="WiFi" />
                <FormControlLabel control={<Switch name="has_parking" checked={formData.has_parking} onChange={handleChange} />} label="Parking" />
                <FormControlLabel control={<Switch name="furnished" checked={formData.furnished} onChange={handleChange} />} label="Furnished" />
                <FormControlLabel control={<Switch name="is_available" checked={formData.is_available} onChange={handleChange} />} label="Available" />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading} 
            sx={{ bgcolor: "#6366F1", fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "#4F46E5" } }}
          >
            {loading ? "Saving..." : (initialData ? "Update Listing" : "Publish Listing")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );}