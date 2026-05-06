import React, { useEffect, useState, useContext } from "react";
import {
  Box, Button, Paper, TextField, MenuItem, Typography, 
  CircularProgress, Grid, Divider, Stack, InputAdornment
} from "@mui/material";
import { 
  SaveRounded, CloseRounded, EditRounded, 
  LocationOnRounded, PaymentsRounded, WcRounded,
  CleanHandsRounded, BedtimeRounded, ChairRounded, HomeWorkRounded,
  SmokingRoomsRounded, GroupRounded
} from "@mui/icons-material";

import api from "../../services/api.js";
import { UserContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const UserPreferences = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    gender: "any", city: "", budget: "", sleep_time: "",
    cleanliness: "", noise_tolerance: "medium", pets_allowed: false,
    guest_policy: "", additional_notes: "", preferred_room_type: "private",
    furnished: false, min_age: 18, max_age: 30, smoking: false
  });

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const res = await api.get("/preferences");
      if (res.data.data) setForm(res.data.data);
    } catch (err) {
      toast.error("Failed to load preferences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPreferences(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // --- مرحلة تنظيف البيانات لحل أخطاء الـ 400 ---
      const { pref_id, userid, created_at, ...rawForm } = form;

      const cleanedData = {
        ...rawForm,
        min_age: rawForm.min_age ? parseInt(rawForm.min_age) : null,
        max_age: rawForm.max_age ? parseInt(rawForm.max_age) : null,
        budget: rawForm.budget ? parseFloat(rawForm.budget) : null,
        smoking: String(rawForm.smoking) === "true",
        pets_allowed: String(rawForm.pets_allowed) === "true",
        furnished: String(rawForm.furnished) === "true",
      };

      await api.put("/preferences", cleanedData);
      toast.success("Preferences updated successfully!");
      setEditMode(false);
      fetchPreferences();
    } catch (err) {
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach(msg => toast.error(msg));
      } else {
        toast.error("Update failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.gender) return <Box sx={{ textAlign: "center", mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 4, mb: 5 }}>
      {/* Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={900}>My Matching Criteria</Typography>
          <Typography variant="body2" color="text.secondary">Refine your roommate search preferences.</Typography>
        </Box>
        {!editMode ? (
          <Button variant="outlined" startIcon={<EditRounded />} onClick={() => setEditMode(true)} sx={{ borderRadius: 2 }}>Edit</Button>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button onClick={() => { setEditMode(false); fetchPreferences(); }}>Cancel</Button>
            <Button variant="contained" onClick={handleSave} sx={{ bgcolor: "#6366F1", borderRadius: 2 }}>Save</Button>
          </Stack>
        )}
      </Stack>

      <Grid container spacing={3}>
        {/* المربع الأول: المتطلبات الأساسية (هنا أضفنا الحقول الجديدة) */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #F1F5F9" }} elevation={0}>
            <Typography variant="subtitle1" fontWeight={800} mb={3} color="primary">Basic Requirements</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth select label="Preferred Gender" name="gender" value={form.gender || ""} onChange={handleChange} disabled={!editMode}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="any">Any</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Target City" name="city" value={form.city || ""} onChange={handleChange} disabled={!editMode} />
              </Grid>
              
              {/* الحقول الجديدة بدقة */}
              <Grid item xs={6} md={3}>
                <TextField fullWidth label="Min Age" name="min_age" type="number" value={form.min_age || ""} onChange={handleChange} disabled={!editMode} />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField fullWidth label="Max Age" name="max_age" type="number" value={form.max_age || ""} onChange={handleChange} disabled={!editMode} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth select label="Smoking Status" name="smoking" value={String(form.smoking)} onChange={handleChange} disabled={!editMode}>
                  <MenuItem value="true">Smoker</MenuItem>
                  <MenuItem value="false">Non-Smoker</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label="Monthly Budget (JOD)" name="budget" type="number" value={form.budget || ""} onChange={handleChange} disabled={!editMode} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* المربع الثاني: نمط الحياة والسكن */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #F1F5F9" }} elevation={0}>
            <Typography variant="subtitle1" fontWeight={800} mb={3} color="primary">Lifestyle & Housing</Typography>
            <Stack spacing={2.5}>
              <TextField fullWidth select label="Room Type" name="preferred_room_type" value={form.preferred_room_type || ""} onChange={handleChange} disabled={!editMode}>
                <MenuItem value="private">Private Room</MenuItem>
                <MenuItem value="shared">Shared Room</MenuItem>
                <MenuItem value="studio">Studio</MenuItem>
              </TextField>
              <TextField fullWidth select label="Furnished" name="furnished" value={String(form.furnished)} onChange={(e) => setForm({...form, furnished: e.target.value === "true"})} disabled={!editMode}>
                <MenuItem value="true">Yes, Furnished</MenuItem>
                <MenuItem value="false">No, Unfurnished</MenuItem>
              </TextField>
              <TextField fullWidth select label="Sleep Schedule" name="sleep_time" value={form.sleep_time || ""} onChange={handleChange} disabled={!editMode}>
                <MenuItem value="morning">Morning Person</MenuItem>
                <MenuItem value="night">Night Owl</MenuItem>
                <MenuItem value="flexible">Flexible</MenuItem>
              </TextField>
            </Stack>
          </Paper>
        </Grid>

        {/* المربع الثالث: الملاحظات */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 4, border: "1px solid #F1F5F9" }} elevation={0}>
             <Typography variant="subtitle1" fontWeight={800} mb={2}>Additional Notes</Typography>
             <TextField fullWidth multiline rows={3} name="additional_notes" value={form.additional_notes || ""} onChange={handleChange} disabled={!editMode} placeholder="Describe your ideal roommate..." />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPreferences;