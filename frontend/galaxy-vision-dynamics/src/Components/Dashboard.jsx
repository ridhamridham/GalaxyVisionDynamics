import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showBanquetModal, setShowBanquetModal] = useState(false);
  const [showPoolModal, setShowPoolModal] = useState(false);

  const handleClose = () => {
    setShowFoodModal(false);
    setShowRoomModal(false);
    setShowBanquetModal(false);
    setShowPoolModal(false);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Booking Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setShowFoodModal(true)}>
                Order Food
              </Nav.Link>
              <Nav.Link onClick={() => setShowRoomModal(true)}>
                Book Room
              </Nav.Link>
              <Nav.Link onClick={() => setShowBanquetModal(true)}>
                Book Banquet
              </Nav.Link>
              <Nav.Link onClick={() => setShowPoolModal(true)}>
                Pool Access
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="mt-5">
        <Row>
          <Col>
            <h1>Welcome to Our Booking Page</h1>
            <p>
              Order food, book rooms, banquet halls, and pool access with ease!
            </p>
          </Col>
        </Row>
      </Container>

      {/* Cards Section */}
      <Container className="mt-5">
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Order Food</Card.Title>
                <Card.Text>
                  Explore our delicious menu and order food online.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => setShowFoodModal(true)}
                >
                  Order Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Book Room</Card.Title>
                <Card.Text>Find the perfect room for your stay.</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => setShowRoomModal(true)}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Book Banquet</Card.Title>
                <Card.Text>
                  Host your events in our luxurious banquet halls.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => setShowBanquetModal(true)}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Pool Access</Card.Title>
                <Card.Text>
                  Book your pool slot and enjoy a refreshing swim.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => setShowPoolModal(true)}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modals */}
      <FoodModal show={showFoodModal} handleClose={handleClose} />
      <RoomModal show={showRoomModal} handleClose={handleClose} />
      <BanquetModal show={showBanquetModal} handleClose={handleClose} />
      <PoolModal show={showPoolModal} handleClose={handleClose} />
    </div>
  );
}

const FoodModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Order Food</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Select Food</Form.Label>
          <Form.Select>
            <option>Pizza</option>
            <option>Burger</option>
            <option>Pasta</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Special Requests</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Place Order
      </Button>
    </Modal.Footer>
  </Modal>
);

const RoomModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Book Room</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Check-in Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Check-out Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Confirm Booking
      </Button>
    </Modal.Footer>
  </Modal>
);

const BanquetModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Book Banquet Hall</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Event Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Confirm Booking
      </Button>
    </Modal.Footer>
  </Modal>
);

const PoolModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Book Pool Access</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Select Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select Time Slot</Form.Label>
          <Form.Select>
            <option>10:00 AM - 12:00 PM</option>
            <option>12:00 PM - 2:00 PM</option>
            <option>2:00 PM - 4:00 PM</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Confirm Booking
      </Button>
    </Modal.Footer>
  </Modal>
);

export default Dashboard;
