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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";

function Payment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const id = queryParams.get("id");
  const bookingId = queryParams.get("bookingId");
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [openRedeemDialog, setOpenRedeemDialog] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/galaxyvision/users/${type}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setItem(response.data);
        setTotalPrice(response.data.price * 1.13);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };
    fetchItem();
  }, [type, id]);

  useEffect(() => {
    const fetchSavedCards = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userId = userDetails?.id;
        const response = await axios.get("http://localhost:8080/galaxyvision/users/cards", {
          params: { userId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSavedCards(response.data);
      } catch (error) {
        console.error("Error fetching saved cards:", error);
      }
    };
    fetchSavedCards();
  }, []);

  useEffect(() => {
    const fetchLoyaltyPoints = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userId = userDetails?.id;
        const response = await axios.get(`http://localhost:8080/galaxyvision/users/loyalty/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLoyaltyPoints(response.data.balance);
      } catch (error) {
        console.error("Error fetching loyalty points:", error);
      }
    };
    fetchLoyaltyPoints();
  }, []);

  const handleCardChange = (e) => {
    setSelectedCard(e.target.value);
  };

  const handleNewCardChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const saveNewCard = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const payload = {
        userId: userDetails.id,
        cardNumber: newCard.cardNumber,
        expiryDate: newCard.expiryDate,
      };
      const response = await axios.post(
        "http://localhost:8080/galaxyvision/users/cards/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSavedCards([...savedCards, response.data]);
      setNewCard({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  const handleRedeemPoints = () => {
    setOpenRedeemDialog(true);
  };

  const handleCloseRedeemDialog = () => {
    setOpenRedeemDialog(false);
    setRedeemAmount(0);
  };

  const handleRedeemAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    if (!isNaN(amount)) {
      setRedeemAmount(amount);
    }
  };

  const applyRedeemedPoints = () => {
    const maxRedeemAmount = Math.floor(loyaltyPoints / 1000);
    if (redeemAmount > maxRedeemAmount) {
      alert(`You can only redeem up to $${maxRedeemAmount}.`);
      return;
    }
    const discountedPrice = totalPrice - redeemAmount;
    setTotalPrice(discountedPrice > 0 ? discountedPrice : 0);
    setUseLoyaltyPoints(true);
    setOpenRedeemDialog(false);
  };

  const handlePayment = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const paymentPayload = {
        userId: userDetails.id,
        userEmail: userDetails.email,
        bookingId: bookingId,
        amount: totalPrice,
        paymentMethod: "card",
        loyaltyPointsUsed: useLoyaltyPoints ? Math.floor(loyaltyPoints / 1000) * 1000 : 0,
        targetId: id,
        targetType: type,
      };
      const response = await axios.post(
        "http://localhost:8080/galaxyvision/payments",
        paymentPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Payment successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <Layout>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Payment Details
        </Typography>

        {item && (
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5">{item.type || item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${item.price} | {type === "room" && `Capacity: ${item.capacity}`}
              </Typography>
            </CardContent>
          </Card>
        )}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">
            Loyalty Points: {loyaltyPoints} (1000 points = $1 CAD)
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRedeemPoints}
            disabled={loyaltyPoints < 1000}
          >
            Redeem Points
          </Button>
        </Box>

        <Dialog open={openRedeemDialog} onClose={handleCloseRedeemDialog}>
          <DialogTitle>Redeem Points</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              You have {loyaltyPoints} points (${Math.floor(loyaltyPoints / 1000)} available to redeem).
            </Typography>
            <TextField
              label="Amount to Redeem ($)"
              type="number"
              value={redeemAmount}
              onChange={handleRedeemAmountChange}
              fullWidth
              inputProps={{
                min: 0,
                max: Math.floor(loyaltyPoints / 1000),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRedeemDialog}>Cancel</Button>
            <Button onClick={applyRedeemedPoints} color="primary">
              Redeem
            </Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h6" gutterBottom>
          Select Card
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Card</InputLabel>
          <Select value={selectedCard} onChange={handleCardChange}>
            {savedCards.map((card) => (
              <MenuItem key={card.id} value={card.id}>
                **** **** **** {card.lastFourDigits}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>
          Add New Card
        </Typography>
        <TextField
          label="Card Number"
          name="cardNumber"
          value={newCard.cardNumber}
          onChange={handleNewCardChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Expiry Date"
          name="expiryDate"
          value={newCard.expiryDate}
          onChange={handleNewCardChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="CVV"
          name="cvv"
          value={newCard.cvv}
          onChange={handleNewCardChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={saveNewCard}>
          Save Card
        </Button>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Total Price: ${totalPrice.toFixed(2)}
        </Typography>

        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handlePayment}>
          Proceed to Payment
        </Button>
      </Container>
    </Layout>
  );
}

export default Payment;