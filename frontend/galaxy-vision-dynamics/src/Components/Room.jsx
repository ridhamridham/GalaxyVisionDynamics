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
  Slider,
  Box,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Layout from "./Layout";

function Room() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [sortBy, setSortBy] = useState("price_asc");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedRoom, setSelectedRoom] = useState(null); // Track selected room for pop-up
  const [openModal, setOpenModal] = useState(false); // Control modal visibility

  useEffect(() => {
    // Fetch rooms from the backend
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8080/galaxyvision/users/rooms/getrooms", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRooms(response.data);
        setFilteredRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // Handle sorting
  useEffect(() => {
    let sortedRooms = [...filteredRooms];
    if (sortBy === "price_asc") {
      sortedRooms.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      sortedRooms.sort((a, b) => b.price - a.price);
    } else if (sortBy === "capacity_asc") {
      sortedRooms.sort((a, b) => a.capacity - b.capacity);
    } else if (sortBy === "capacity_desc") {
      sortedRooms.sort((a, b) => b.capacity - a.capacity);
    }
    setFilteredRooms(sortedRooms);
  }, [sortBy]);

  // Handle price filtering
  useEffect(() => {
    const filtered = rooms.filter(
      (room) => room.price >= priceRange[0] && room.price <= priceRange[1]
    );
    setFilteredRooms(filtered);
  }, [priceRange, rooms]);

  // Handle room click (open modal)
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
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
          Available Rooms
        </Typography>

        {/* Filter and Sort Controls */}
        <Box sx={{ mb: 4 }}>
          <FormControl sx={{ mr: 2, minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="price_asc">Price (Low to High)</MenuItem>
              <MenuItem value="price_desc">Price (High to Low)</MenuItem>
              <MenuItem value="capacity_asc">Capacity (Low to High)</MenuItem>
              <MenuItem value="capacity_desc">Capacity (High to Low)</MenuItem>
            </Select>
          </FormControl>

          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={500}
          />
        </Box>

        {/* Room Cards */}
        <Grid container spacing={3}>
          {filteredRooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card onClick={() => handleRoomClick(room)}>
                <Carousel showThumbs={false} showStatus={false}>
                  {room.imageUrls.map((url, index) => (
                    <div key={index}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={url || "https://via.placeholder.com/300"}
                        alt={`Room Image ${index + 1}`}
                      />
                    </div>
                  ))}
                </Carousel>
                <CardContent>
                  <Typography variant="h5">{room.type}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${room.price} per night | Capacity: {room.capacity}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pop-up Modal */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>{selectedRoom?.type}</DialogTitle>
          <DialogContent>
            {selectedRoom && (
              <>
                <Carousel showThumbs={false} showStatus={false}>
                  {selectedRoom.imageUrls.map((url, index) => (
                    <div key={index}>
                      <img
                        src={url || "https://via.placeholder.com/300"}
                        alt={`Room Image ${index + 1}`}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  ))}
                </Carousel>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {selectedRoom.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  ${selectedRoom.price} per night | Capacity: {selectedRoom.capacity}
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
                window.location.href = `/booking?type=rooms&id=${selectedRoom.id}`;
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

export default Room;