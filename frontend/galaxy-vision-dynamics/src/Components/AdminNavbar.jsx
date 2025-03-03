import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  // Retrieve admin details from localStorage
  let adminDetails = null;
  try {
    const storedDetails = localStorage.getItem("adminDetails");
    if (storedDetails) {
      adminDetails = JSON.parse(storedDetails);
    }
  } catch (error) {
    console.error("Error parsing adminDetails:", error);
  }

  const handleLogout = () => {
    // Clear admin token and details from localStorage
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminDetails");

    navigate("/AdminLogin");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
      <Container>
        {}
        <Navbar.Brand href="/AdminDashboard">Admin Portal</Navbar.Brand>

        {}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {}
            <Nav.Item className="me-3 text-light">
              {adminDetails && adminDetails.name
                ? `Welcome, ${adminDetails.name}`
                : "Welcome, Guest"}
            </Nav.Item>

            {/* Logout Button */}
            <Nav.Item>
              <Button
                variant="outline-light"
                size="sm"
                onClick={handleLogout}
                style={{ marginLeft: "10px" }}
              >
                Logout
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;