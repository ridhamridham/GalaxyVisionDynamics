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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,Box,
} from "@mui/material";
import Layout from "./Layout";

function Food() {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [sortBy, setSortBy] = useState("price_asc");
  const [foodType, setFoodType] = useState("all");
  const [selectedFood, setSelectedFood] = useState(null); // Track selected food item
  const [openModal, setOpenModal] = useState(false); // Control modal visibility

  useEffect(() => {
    // Fetch food items from the backend
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/galaxyvision/users/food/getFoodItems", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFoodItems(response.data);
        setFilteredFoodItems(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  // Handle sorting and filtering
  useEffect(() => {
    let filtered = [...foodItems];
    if (foodType !== "all") {
      filtered = filtered.filter((item) => item.foodType === foodType);
    }
    if (sortBy === "price_asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredFoodItems(filtered);
  }, [foodType, sortBy, foodItems]);

  // Handle food item click (open modal)
  const handleFoodClick = (food) => {
    setSelectedFood(food);
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
          Food Menu
        </Typography>

        {/* Filter and Sort Controls */}
        <Box sx={{ mb: 4 }}>
          <FormControl sx={{ mr: 2, minWidth: 120 }}>
            <InputLabel>Food Type</InputLabel>
            <Select value={foodType} onChange={(e) => setFoodType(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="drink">Drinks</MenuItem>
              <MenuItem value="starter">Starters</MenuItem>
              <MenuItem value="main">Main Course</MenuItem>
              <MenuItem value="dessert">Desserts</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ mr: 2, minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="price_asc">Price (Low to High)</MenuItem>
              <MenuItem value="price_desc">Price (High to Low)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Food Cards */}
        <Grid container spacing={3}>
          {filteredFoodItems.map((food) => (
            <Grid item xs={12} sm={6} md={4} key={food.id}>
              <Card onClick={() => handleFoodClick(food)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={food.imgUrl || "https://via.placeholder.com/300"}
                  alt={food.name}
                />
                <CardContent>
                  <Typography variant="h5">{food.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${food.price} | {food.foodType}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pop-up Modal */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>{selectedFood?.name}</DialogTitle>
          <DialogContent>
            {selectedFood && (
              <>
                <CardMedia
                  component="img"
                  height="300"
                  image={selectedFood.imgUrl || "https://via.placeholder.com/300"}
                  alt={selectedFood.name}
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {selectedFood.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  ${selectedFood.price} | {selectedFood.foodType}
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
                window.location.href = `/booking?type=food&id=${selectedFood.id}`;
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

export default Food;