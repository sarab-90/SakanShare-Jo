import React, { useState } from "react";
import {
  Box, Container, Paper, Typography, TextField, Grid, Button,
  InputAdornment, Divider, Stack, CircularProgress
} from "@mui/material";
import {
  AddPhotoAlternate, LocationOn, AttachMoney, Hotel, Bathtub, Group
} from "@mui/icons-material";
import toast from "react-hot-toast";
import api from "../../services/api.js";

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
};

const CreateListing = () => {
  const [loading, setLoading] = useState(false);

  // تحديث الحالة لتشمل الحقول المطلوبة من السيرفر
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    area: "",
    rooms_count: "",
    bathrooms_count: "",
    max_occupants: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق الأساسي
    if (!formData.title || !formData.price || !formData.city || !formData.area) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);

      // إرسال البيانات (تأكد أن السيرفر يتوقع أرقاماً للحقول العددية)
      const dataToSend = {
        ...formData,
        price: Number(formData.price),
        rooms_count: Number(formData.rooms_count),
        bathrooms_count: Number(formData.bathrooms_count),
        max_occupants: Number(formData.max_occupants),
      };

      const res = await api.post("/listings", dataToSend);

      toast.success(res.data.message || "Listing created successfully");

      // إعادة تعيين النموذج
      setFormData({
        title: "", description: "", price: "", city: "",
        area: "", rooms_count: "", bathrooms_count: "", max_occupants: ""
      });

    } catch (error) {
      // عرض أول رسالة خطأ تأتي من السيرفر إذا وجدت
      const serverError = error.response?.data?.errors?.[0] || error.response?.data?.message;
      toast.error(serverError || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 4, md: 7 }, background: "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 50%, #F8FAFC 100%)" }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: "1px solid #E2E8F0", backgroundColor: "#FFFFFF" }}>
          <Box mb={5}>
            <Typography variant="h4" fontWeight={800} color="primary.main">Share Your Space</Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* TITLE */}
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Listing Title (Min 5 characters)"
                  name="title" value={formData.title} onChange={handleChange}
                  sx={inputStyle} required
                />
              </Grid>

              {/* CITY & AREA */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label="City" name="city"
                  value={formData.city} onChange={handleChange}
                  sx={inputStyle} required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label="Area / Neighborhood" name="area"
                  value={formData.area} onChange={handleChange}
                  sx={inputStyle} required
                />
              </Grid>

              {/* PRICE */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label="Price" name="price" type="number"
                  value={formData.price} onChange={handleChange}
                  sx={inputStyle} required
                  InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoney/></InputAdornment> }}
                />
              </Grid>

              {/* ROOMS COUNT */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label="Rooms Count" name="rooms_count" type="number"
                  value={formData.rooms_count} onChange={handleChange}
                  sx={inputStyle} required
                  InputProps={{ startAdornment: <InputAdornment position="start"><Hotel/></InputAdornment> }}
                />
              </Grid>

              {/* BATHROOMS */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label="Bathrooms" name="bathrooms_count" type="number"
                  value={formData.bathrooms_count} onChange={handleChange}
                  sx={inputStyle} required
                  InputProps={{ startAdornment: <InputAdornment position="start"><Bathtub/></InputAdornment> }}
                />
              </Grid>

              {/* MAX OCCUPANTS */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label="Max Occupants" name="max_occupants" type="number"
                  value={formData.max_occupants} onChange={handleChange}
                  sx={inputStyle} required
                  InputProps={{ startAdornment: <InputAdornment position="start"><Group/></InputAdornment> }}
                />
              </Grid>

              {/* DESCRIPTION */}
              <Grid item xs={12}>
                <TextField
                  fullWidth multiline rows={4} label="Description"
                  name="description" value={formData.description} onChange={handleChange}
                  sx={inputStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit" fullWidth size="large" disabled={loading}
                  variant="contained"
                  sx={{ py: 1.5, fontWeight: "bold", borderRadius: 3 }}
                >
                  {loading ? <CircularProgress size={24} /> : "Publish Listing"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateListing;