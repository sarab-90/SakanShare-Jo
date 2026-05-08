import React, { useState, useEffect } from "react";
import { 
  Grid, Card, CardContent, Typography, Rating, 
  Avatar, Box, Container, Stack, Skeleton 
} from "@mui/material";
import api from "../../services/api.js";

export default function TopLandlords() {
  const [landlords, setLandlords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopLandlords = async () => {
      try {
        const res = await api.get("/top/landlords");
        if (res.data.success) {
          setLandlords(res.data.landlords);
        }
      } catch (err) {
        console.error("Error fetching top landlords:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopLandlords();
  }, []);

  if (!loading && landlords.length === 0) return null;

  return (
    <Container sx={{ py: 10 }}>
      <Stack spacing={1} alignItems="center" sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight={800} color="#1B262C">
          Top Rated Landlords
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover the most trusted landlords based on student reviews
        </Typography>
      </Stack>

      <Grid container spacing={4}>
        {loading
          ? [1, 2, 3, 4].map((i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 4 }} />
              </Grid>
            ))
          : landlords.map((landlord) => (
              <Grid item xs={12} sm={6} md={3} key={landlord.userid}>
                <Card
                  sx={{
                    borderRadius: 4,
                    textAlign: "center",
                    p: 3,
                    border: "1px solid #E2E8F0",
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.05)",
                      borderColor: "#6366F1",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "#6366F1",
                        fontSize: 28,
                        fontWeight: "bold",
                        boxShadow: "0 4px 10px rgba(99, 102, 241, 0.2)",
                      }}
                    >
                      {landlord.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6" fontWeight={700} color="#1E293B">
                      {landlord.name}
                    </Typography>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ my: 1 }}>
                      <Rating value={Number(landlord.avg_rating)} readOnly precision={0.5} size="small" />
                      <Typography variant="body2" fontWeight={800} color="#6366F1">
                        {landlord.avg_rating}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      {landlord.total_reviews} Reviews
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}