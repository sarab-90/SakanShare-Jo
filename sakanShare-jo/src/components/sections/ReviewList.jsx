import React from "react";
import { 
  Box, 
  Typography, 
  Rating, 
  Avatar, 
  List, 
  ListItem, 
  Divider, 
  Paper,
  Stack 
} from "@mui/material";

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
        No reviews yet. Be the first to rate!
      </Typography>
    );
  }
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {reviews.map((review, index) => (
        <React.Fragment key={review.review_id}>
          <ListItem alignItems="flex-start" sx={{ px: 0, py: 3 }}>
            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
              <Avatar sx={{ bgcolor: "#6366F1" }}>
                {review.reviewer_name?.charAt(0) || "U"}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight="700">
                    {review.reviewer_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {review.created_at ? new Date(review.created_at).toLocaleDateString() : ""}
                  </Typography>
                </Stack>

                <Rating value={Number(review.rating)} readOnly size="small" precision={0.5} sx={{ my: 0.5 }} />
                
                <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>

                {review.owner_reply && (
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      mt: 2, 
                      bgcolor: '#F1F5F9', 
                      borderLeft: '4px solid #6366F1',
                      borderRadius: '4px'
                    }}
                  >
                    <Typography variant="caption" fontWeight="bold" color="primary" display="block" gutterBottom>
                      Owner's Response:
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      {review.owner_reply}
                    </Typography>
                  </Paper>
                )}
              </Box>
            </Stack>
          </ListItem>
          {index < reviews.length - 1 && <Divider variant="inset" component="li" sx={{ ml: 7 }} />}
        </React.Fragment>
      ))}
    </List>
  );
};
export default ReviewList;