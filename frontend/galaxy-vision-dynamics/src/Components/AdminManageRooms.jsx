import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Alert,
  Table,
  Card,
  FloatingLabel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";
import Footer from "./footer";

function AdminManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [error, setError] = useState("");
  const [editRoomId, setEditRoomId] = useState(null); // Track room being edited

  // Fetch all rooms from the backend
  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("You are not authorized. Please log in as an admin.");
        return;
      }

      const response = await axios.get("http://localhost:8080/galaxyvision/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch rooms. Please try again.");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Add or Update Room
  const handleAddOrUpdateRoom = async (e) => {
    e.preventDefault();
    if (!type || !price || !capacity || !description) {
      setError("Please fill out all fields");
      return;
    }

    const newRoom = {
      type,
      price: parseFloat(price),
      capacity: parseInt(capacity),
      description,
      isAvailable,
    };

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("You are not authorized. Please log in as an admin.");
        return;
      }

      if (editRoomId) {
        // Update existing room
        await axios.put(`http://localhost:8080/galaxyvision/rooms/${editRoomId}`, newRoom, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditRoomId(null); // Reset edit mode
      } else {
        // Add new room
        await axios.post("http://localhost:8080/galaxyvision/rooms", newRoom, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      // Refresh the room list
      fetchRooms();
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Failed to save room. Please try again.");
    }
  };

  // Edit Room
  const handleEditRoom = (room) => {
    setType(room.type);
    setPrice(room.price.toString());
    setCapacity(room.capacity.toString());
    setDescription(room.description);
    setIsAvailable(room.isAvailable);
    setEditRoomId(room.id);
  };

  // Delete Room
  const handleDeleteRoom = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("You are not authorized. Please log in as an admin.");
        return;
      }

      await axios.delete(`http://localhost:8080/galaxyvision/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh the room list
      fetchRooms();
    } catch (err) {
      console.error(err);
      setError("Failed to delete room. Please try again.");
    }
  };

  // Reset Form
  const resetForm = () => {
    setType("");
    setPrice("");
    setCapacity("");
    setDescription("");
    setIsAvailable(true);
    setEditRoomId(null);
    setError("");
  };

  return (
    <>
      {/* Navbar */}
      <AdminNavbar />

      {/* Main Content Wrapper with Fixed Margin */}
      <div style={{ marginTop: "70px" }}> {/* Adjust this value based on navbar height */}
        <Container>
          <h1 className="text-center mb-4">Manage Resort Rooms</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* Add/Edit Room Form */}
          <Card className="shadow-sm mb-5">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                {editRoomId ? "Edit Room" : "Add New Room"}
              </Card.Title>
              <Form onSubmit={handleAddOrUpdateRoom}>
                <FloatingLabel controlId="type" label="Room Type" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Room Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel controlId="price" label="Price (USD)" className="mb-3">
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="capacity"
                  label="Capacity (Number of Guests)"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="description"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Room Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="isAvailable"
                  label="Availability"
                  className="mb-3"
                >
                  <Form.Select
                    value={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.value === "true")}
                    required
                  >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                  </Form.Select>
                </FloatingLabel>
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    {editRoomId ? "Update Room" : "Add Room"}
                  </Button>
                  {editRoomId && (
                    <Button
                      variant="secondary"
                      onClick={resetForm}
                      size="lg"
                      className="mt-2"
                    >
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
          {/* Rooms Table */}
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">Room List</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Room Type</th>
                    <th>Price (USD)</th>
                    <th>Capacity</th>
                    <th>Description</th>
                    <th>Availability</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, index) => (
                    <tr key={room.id}>
                      <td>{index + 1}</td>
                      <td>{room.type}</td>
                      <td>${room.price.toFixed(2)}</td>
                      <td>{room.capacity}</td>
                      <td>{room.description}</td>
                      <td>{room.isAvailable ? "Available" : "Not Available"}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEditRoom(room)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteRoom(room.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <br />
      <Footer />
    </>
  );
}

export default AdminManageRooms;