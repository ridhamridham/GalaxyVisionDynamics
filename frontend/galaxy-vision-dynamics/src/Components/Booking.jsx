import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout"; // Assuming Layout includes the sidebar

function Booking() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  var type = queryParams.get("type"); // room, food, or activity
  if (type === "activity") {
    type = "activities";
  }
  const id = queryParams.get("id"); // ID of the item
  const checkInDate = queryParams.get("checkInDate"); // Check-in date (for rooms)
  const checkOutDate = queryParams.get("checkOutDate"); // Check-out date (for rooms)
  const navigate = useNavigate();

  const [item, setItem] = useState(null); // Room, food, or activity details
  const [addresses, setAddresses] = useState([]); // User's saved addresses
  const [selectedAddress, setSelectedAddress] = useState(""); // Selected address ID
  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // Fetch item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/galaxyvision/users/${type}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItem();
  }, [type, id]);

  // Fetch user's saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userId = userDetails?.id;
        const response = await axios.get("http://localhost:8080/galaxyvision/users/addresses/get", {
          params: { userId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  // Handle address selection
  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  // Handle new address input
  const handleNewAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // Save new address
  const saveNewAddress = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const payload = {
        ...newAddress,
        userId: userDetails.id, // Add user_id from local storage
      };
      const response = await axios.post(
        "http://localhost:8080/galaxyvision/users/addresses/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAddresses([...addresses, response.data]);
      setNewAddress({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  // Calculate total price with 13% tax
  const calculateTotalPrice = () => {
    if (!item) return 0;
    const price = item.price;
    return (price * 1.13).toFixed(2); // Add 13% tax
  };

  // Handle confirm booking
  const handleConfirmBooking = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const userId = userDetails?.id;

      // Prepare the booking payload
      const bookingPayload = {
        userId: userId,
        roomId: type === "rooms" ? id : null,
        foodItemId: type === "food" ? id : null,
        activityId: type === "activities" ? id : null,
        checkInDate: type === "rooms" ? checkInDate : null, // Use check-in date for rooms
        checkOutDate: type === "rooms" ? checkOutDate : null, // Use check-out date for rooms
        totalPrice: parseFloat(calculateTotalPrice()), // Ensure it's a number
      };

      // Call the createBooking API
      const response = await axios.post(
        "http://localhost:8080/galaxyvision/users/bookings",
        bookingPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Navigate to the Payment Page with the booking ID
      navigate(`/payment?type=${type}&id=${id}&bookingId=${response.data.id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <Layout>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Booking Details
        </Typography>

        {/* Display Item Details */}
        {item && (
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5">{item.type || item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${item.price} | {type === "room" ? `Capacity: ${item.capacity}` : ""}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Check-in and Check-out Dates (for rooms only) */}
        {type === "room" && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Check-in Date: {checkInDate}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Check-out Date: {checkOutDate}
            </Typography>
          </Box>
        )}

        {/* Saved Addresses */}
        <Typography variant="h6" gutterBottom>
          Select Address
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Address</InputLabel>
          <Select value={selectedAddress} onChange={handleAddressChange}>
            {addresses.map((address) => (
              <MenuItem key={address.id} value={address.id}>
                {address.addressLine1}, {address.city}, {address.state}, {address.zipCode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Add New Address */}
        <Typography variant="h6" gutterBottom>
          Add New Address
        </Typography>
        <TextField
          label="Address Line 1"
          name="addressLine1"
          value={newAddress.addressLine1}
          onChange={handleNewAddressChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Address Line 2"
          name="addressLine2"
          value={newAddress.addressLine2}
          onChange={handleNewAddressChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="City"
          name="city"
          value={newAddress.city}
          onChange={handleNewAddressChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="State"
          name="state"
          value={newAddress.state}
          onChange={handleNewAddressChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Zip Code"
          name="zipCode"
          value={newAddress.zipCode}
          onChange={handleNewAddressChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Country"
          name="country"
          value={newAddress.country}
          onChange={handleNewAddressChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={saveNewAddress}>
          Save Address
        </Button>

        {/* Total Price */}
        <Typography variant="h6" sx={{ mt: 4 }}>
          Total Price (including 13% tax): ${calculateTotalPrice()}
        </Typography>

        {/* Confirm Booking Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleConfirmBooking}
        >
          Confirm Booking
        </Button>
      </Container>
    </Layout>
  );
}

export default Booking;