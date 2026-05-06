import React, { useState, useEffect } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Grid, MenuItem, Typography, Divider 
} from "@mui/material";

const ListingModal = ({ open, mode, listing, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    area: "",
    price: "",
    rooms_count: 1,
    bathrooms_count: 1,
    max_occupants: 1,
    gender_allowed: "any",
    is_shared: true,
    furnished: false,
    has_wifi: true,
    has_parking: false,
    has_kitchen: true,
    has_washing_machine: false,
    is_available: true,
    currency: "JOD",
    images: []
  });

  // تحديث البيانات عند فتح المودال (للتعديل أو العرض)
  useEffect(() => {
    if (listing && (mode === "edit" || mode === "view")) {
      setFormData({
        ...listing,
        // التأكد من أن القيم الرقمية تظهر بشكل صحيح في الـ Inputs
        price: listing.price || "",
        area: listing.area || "",
        rooms_count: listing.rooms_count || 1,
        bathrooms_count: listing.bathrooms_count || 1,
        max_occupants: listing.max_occupants || 1
      });
    } else {
      // إعادة التعيين عند الإضافة الجديدة
      setFormData({
        title: "", description: "", city: "", area: "", price: "",
        rooms_count: 1, bathrooms_count: 1, max_occupants: 1,
        gender_allowed: "any", is_shared: true, furnished: false,
        has_wifi: true, has_parking: false, has_kitchen: true,
        has_washing_machine: false, is_available: true, currency: "JOD", images: []
      });
    }
  }, [listing, mode, open]);

  const isView = mode === "view";

  const handleSubmit = () => {
    // تجهيز البيانات وتحويلها للأنواع المطلوبة في الباكند (Joi Validation)
    const finalData = {
      ...formData,
      price: Number(formData.price),
      rooms_count: Number(formData.rooms_count),
      bathrooms_count: Number(formData.bathrooms_count),
      max_occupants: Number(formData.max_occupants),
      area: String(formData.area), // الباكند يطلبه String في الـ Schema
      description: formData.description || "No description provided",
      images: formData.images || [],
      currency: formData.currency || "JOD"
    };

    console.log("Submitting to Save:", finalData);
    onSave(finalData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 800, bgcolor: "#F8FAFC" }}>
        {mode === "view" ? "Property Details" : mode === "edit" ? "Edit Property" : "Add New Property"}
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        <Typography variant="subtitle2" color="primary" gutterBottom>Basic Information</Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <TextField fullWidth label="Title (min 5 chars)" disabled={isView} value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={2} label="Description" disabled={isView} value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="City" disabled={isView} value={formData.city} 
              onChange={(e) => setFormData({...formData, city: e.target.value})} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Area (e.g. 150sqm)" disabled={isView} value={formData.area} 
              onChange={(e) => setFormData({...formData, area: e.target.value})} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Price (JOD)" type="number" disabled={isView} value={formData.price} 
              onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2" color="primary" gutterBottom>Technical Details</Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField fullWidth label="Rooms" type="number" disabled={isView} value={formData.rooms_count} 
              onChange={(e) => setFormData({...formData, rooms_count: e.target.value})} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Bathrooms" type="number" disabled={isView} value={formData.bathrooms_count} 
              onChange={(e) => setFormData({...formData, bathrooms_count: e.target.value})} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Max Occupants" type="number" disabled={isView} value={formData.max_occupants} 
              onChange={(e) => setFormData({...formData, max_occupants: e.target.value})} />
          </Grid>
          
          <Grid item xs={6}>
            <TextField fullWidth select label="Gender Allowed" disabled={isView} value={formData.gender_allowed} 
              onChange={(e) => setFormData({...formData, gender_allowed: e.target.value})}>
              <MenuItem value="any">Any</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth select label="Status" disabled={isView} value={formData.is_available} 
              onChange={(e) => setFormData({...formData, is_available: e.target.value})}>
              <MenuItem value={true}>Available</MenuItem>
              <MenuItem value={false}>Full / Occupied</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
             <TextField fullWidth select label="Is Shared?" disabled={isView} value={formData.is_shared} 
              onChange={(e) => setFormData({...formData, is_shared: e.target.value})}>
              <MenuItem value={true}>Yes (Shared Room)</MenuItem>
              <MenuItem value={false}>No (Private)</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: "#F8FAFC" }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 700 }}>Cancel</Button>
        {!isView && (
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            sx={{ bgcolor: "#1B262C", px: 4, fontWeight: 700, "&:hover": { bgcolor: "#334155" } }}
          >
            {mode === "edit" ? "Update Listing" : "Create Listing"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ListingModal;