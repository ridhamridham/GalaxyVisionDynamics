import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import Layout from "./Layout";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  // Fetch booking history
  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userId = userDetails?.id;
        const response = await axios.get(
          `http://localhost:8080/galaxyvision/users/bookings/history/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching booking history:", error);
        setError("Failed to fetch booking history.");
      }
    };

    fetchBookingHistory();
  }, []);

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/galaxyvision/users/bookings/cancel/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data); // Show refund message
      // Refresh booking history
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const userId = userDetails?.id;
      const updatedResponse = await axios.get(
        `http://localhost:8080/galaxyvision/users/bookings/history/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookings(updatedResponse.data);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert(error.response?.data || "Failed to cancel booking.");
    }
  };

  return (
    <Layout>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Booking History
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 3 }}>
            {error}
          </Typography>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Check-in Date</TableCell>
                <TableCell>Check-out Date</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>
                    {booking.room ? "Room" : booking.foodItem ? "Food" : "Activity"}
                  </TableCell>
                  <TableCell>{booking.checkInDate}</TableCell>
                  <TableCell>{booking.checkOutDate}</TableCell>
                  <TableCell>${booking.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>
                    {booking.status === "CONFIRMED" && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
}

export default BookingHistory;