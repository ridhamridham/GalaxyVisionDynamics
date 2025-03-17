import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Layout from "./Layout";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [sortBy, setSortBy] = useState("price_asc");
  const [selectedActivity, setSelectedActivity] = useState(null); // Track selected activity
  const [openModal, setOpenModal] = useState(false); // Control modal visibility

  useEffect(() => {
    // Fetch activities from the backend
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:8080/galaxyvision/users/activities/getactivities", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  // Handle sorting
  useEffect(() => {
    let sortedActivities = [...activities];
    if (sortBy === "price_asc") {
      sortedActivities.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      sortedActivities.sort((a, b) => b.price - a.price);
    }
    setActivities(sortedActivities);
  }, [sortBy]);

  // Handle activity click (open modal)
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setOpenModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Layout>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Available Activities
        </Typography>

        {/* Sort Control */}
        <Box sx={{ mb: 4 }}>
          <FormControl sx={{ mr: 2, minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="price_asc">Price (Low to High)</MenuItem>
              <MenuItem value="price_desc">Price (High to Low)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Activity Cards */}
        <Grid container spacing={3}>
          {activities.map((activity) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <Card onClick={() => handleActivityClick(activity)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={activity.imageUrl || "https://via.placeholder.com/300"}
                  alt={activity.name}
                />
                <CardContent>
                  <Typography variant="h5">{activity.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${activity.price} | {activity.availableTime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pop-up Modal */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>{selectedActivity?.name}</DialogTitle>
          <DialogContent>
            {selectedActivity && (
              <>
                <CardMedia
                  component="img"
                  height="300"
                  image={selectedActivity.imageUrl || "https://via.placeholder.com/300"}
                  alt={selectedActivity.name}
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {selectedActivity.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  ${selectedActivity.price} | {selectedActivity.availableTime}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Close</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleCloseModal();
                window.location.href = `/booking?type=activity&id=${selectedActivity.id}`;
              }}
            >
              Book Now
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}

export default Activities;