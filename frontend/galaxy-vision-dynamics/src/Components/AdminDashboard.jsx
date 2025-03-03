import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar"; // Import the actual navbar
import RoomImage from "../Images/rooms.jpg";
import ActivityImage from "../Images/Activites.jpg";
import FoodImage from "../Images/Foodorder.jpg";
import UserImage from "../Images/Users.jpg";
import Footer from "./footer";
import LoyalityPoints from "../Images/LoyalityPoints.jpg";
import FoodMenu from "../Images/FoodMenu.jpg";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <AdminNavbar /> {/* Include the actual navbar */}

      {/* Main Content */}
      <Container fluid className="mt-4">
        <h1 className="text-center mb-4">Admin Dashboard</h1>

        {/* First Row of Cards */}
        <Row className="g-4">
          <Col md={6} lg={4}>
            <Card style={{ height: "100%" }}>
              <Card.Img
                variant="top"
                src={RoomImage}
                alt="Manage Rooms"
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Manage Rooms</Card.Title>
                <Card.Text>Add, edit, or remove rooms.</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => navigate("/manage-rooms")}
                >
                  Go to Rooms
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card style={{ height: "100%" }}>
              <Card.Img
                variant="top"
                src={ActivityImage}
                alt="Manage Activities"
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Manage Activities</Card.Title>
                <Card.Text>Add, edit, or remove activities.</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => navigate("/manage-activities")}
                >
                  Go to Activities
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card style={{ height: "100%" }}>
              <Card.Img
                variant="top"
                src={FoodImage}
                alt="Manage Food Orders"
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Manage Food Orders</Card.Title>
                <Card.Text>Add, edit, or remove food orders.</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => navigate("/adminmanageFoodorders")}
                >
                  Go to Food Orders
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Second Row of Cards */}
        <Row className="g-4 mt-4">
          <Col md={6} lg={4}>
            <Card style={{ height: "100%" }}>
              <Card.Img
                variant="top"
                src={UserImage}
                alt="Manage Users"
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Manage Users</Card.Title>
                <Card.Text>Add, edit, or remove users.</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => navigate("/adminManageUsers")}
                >
                  Go to Users
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card style={{ height: "100%" }}>
              <Card.Img
                variant="top"
                src={FoodMenu}
                alt="Manage Food Menu"
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Manage Food Menu</Card.Title>
                <Card.Text>Add, edit, or remove food menu items.</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => navigate("/adminFoodMenuitems")}
                >
                  Go to Food Menu
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card style={{ height: "100%" }}>
              <Card.Img
                variant="top"
                src={LoyalityPoints}
                alt="Manage Loyalty Points"
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Manage Loyalty Points</Card.Title>
                <Card.Text>Add, edit, or remove loyalty points.</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => navigate("/adminLoyalityPoints")}
                >
                  Go to Loyalty Points
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default AdminDashboard;