import React, { useContext, useEffect, useState } from "react";
import { Box, Paper, Typography, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Tooltip, InputAdornment } from "@mui/material";
import { Search, Plus, Edit3, Trash2, Eye } from "lucide-react";
import { ListingContext } from "../../context/ListingContext.jsx";
import ListingModal from "../../components/admin/ListingModal.jsx";

const ListingsManagement = () => {
  const { listings, loading, getListings, deleteListing, updateListing, createListing } = useContext(ListingContext);
  const [search, setSearch] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  useEffect(() => { getListings(); }, []);

const handleSave = async (formData) => {
  console.log("Fixing Not-Null constraint by merging data...");

  // 1. استخراج الحقول التي لا نريد تعديلها (الزوائد)
  const { 
    listing_id, owner_id, owner_name, owner_phone, 
    created_at, updated_at, current_occupants, 
    ...updatedFields 
  } = formData;

  // 2. دمج البيانات: نأخذ القيمة من الـ Listing المختار أصلاً (selectedListing)
  // ونستبدلها فقط إذا كان هناك قيمة جديدة في formData
  const finalData = {
    title: updatedFields.title || selectedListing.title,
    description: updatedFields.description || selectedListing.description,
    city: updatedFields.city || selectedListing.city,
    area: String(updatedFields.area || selectedListing.area),
    price: Number(updatedFields.price ?? selectedListing.price),
    rooms_count: Number(updatedFields.rooms_count ?? selectedListing.rooms_count),
    bathrooms_count: Number(updatedFields.bathrooms_count ?? selectedListing.bathrooms_count),
    // هنا الأهم: إذا لم تعدلي max_occupants، نرسل القيمة القديمة الموجودة في selectedListing
    max_occupants: Number(updatedFields.max_occupants ?? selectedListing.max_occupants),
    gender_allowed: updatedFields.gender_allowed || selectedListing.gender_allowed,
    is_shared: updatedFields.is_shared ?? selectedListing.is_shared,
    furnished: updatedFields.furnished ?? selectedListing.furnished,
    is_available: updatedFields.is_available ?? selectedListing.is_available,
    images: Array.isArray(updatedFields.images) ? updatedFields.images : (selectedListing.images || []),
    currency: updatedFields.currency || selectedListing.currency || "JOD",
    has_wifi: updatedFields.has_wifi ?? selectedListing.has_wifi,
    has_parking: updatedFields.has_parking ?? selectedListing.has_parking,
    has_kitchen: updatedFields.has_kitchen ?? selectedListing.has_kitchen,
    has_washing_machine: updatedFields.has_washing_machine ?? selectedListing.has_washing_machine
  };

  console.log("Final Clean Data Sent to Backend:", finalData);

  try {
    if (modalMode === "edit") {
      await updateListing(selectedListing.listing_id, finalData);
    } else {
      await createListing(finalData);
    }
    setModalOpen(false);
  } catch (err) {
    console.error("Critical Error during save:", err);
  }
};
  const filtered = (listings || []).filter(l => l.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ p: 5, mb:15}}>
      <Stack direction="row" justifyContent="space-between" mb={20} >
        <Typography variant="h4" fontWeight={800}>Listings</Typography>
        <Button variant="contained" startIcon={<Plus />} onClick={() => { setModalMode("add"); setModalOpen(true); }} sx={{ bgcolor: "#1B262C" }}>Add Listing</Button>
      </Stack>

      <TextField fullWidth placeholder="Search..." sx={{ mb: 2 }} onChange={(e) => setSearch(e.target.value)} />

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "#F8FAFC" }}>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.listing_id}>
                  <TableCell>{l.title}</TableCell>
                  <TableCell>{l.city}</TableCell>
                  <TableCell>{l.price} JOD</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton onClick={() => { setSelectedListing(l); setModalMode("view"); setModalOpen(true); }}><Eye size={18} /></IconButton>
                      <IconButton onClick={() => { setSelectedListing(l); setModalMode("edit"); setModalOpen(true); }} color="warning"><Edit3 size={18} /></IconButton>
                      <IconButton onClick={() => { if(window.confirm("Delete?")) deleteListing(l.listing_id); }} color="error"><Trash2 size={18} /></IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <ListingModal open={modalOpen} mode={modalMode} listing={selectedListing} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </Box>
  );
};
export default ListingsManagement;