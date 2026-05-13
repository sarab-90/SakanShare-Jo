import React, { useState } from "react";
import { Box, Typography, Rating, TextField, Button, Paper, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import api from "../../services/api.js";
import { toast } from "react-hot-toast";

const AddReviewForm = ({ reviewedUserId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a rating!");

    setSubmitting(true);
    try {
      const response = await api.post("/add", {
        reviewed_user_id: reviewedUserId,
        rating,
        comment,
      });

      if (response.data.success) {
        toast.success("Review added successfully!");
        setRating(0);
        setComment("");
        if (onReviewAdded) onReviewAdded();
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to add review";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 4, mb: 3, border: "1px dashed #6366F1" }} elevation={0}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Leave a Review for this Landlord
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box>
            <Typography component="legend" variant="body2" color="text.secondary">Rating</Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Write your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            startIcon={<Send />}
            sx={{ alignSelf: "flex-end", bgcolor: "#6366F1" }}
          >
            {submitting ? "Submitting..." : "Post Review"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
export default AddReviewForm;