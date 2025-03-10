import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminDetails, setAdminDetails] = React.useState(null);

  React.useEffect(() => {
    try {
      const storedDetails = localStorage.getItem("adminDetails");
      if (storedDetails) {
        setAdminDetails(JSON.parse(storedDetails));
      }
    } catch (error) {
      console.error("Error parsing adminDetails:", error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminDetails");
    navigate("/AdminLogin");
  };

  // Get page title based on route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/admin/drinks":
        return "🍹 Drinks Menu";
      case "/admin/starters":
        return "🍽️ Starters";
      case "/admin/main-course":
        return "🍲 Main Course";
      case "/admin/desserts":
        return "🍩 Desserts";
      default:
        return "Admin Portal";
    }
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand>{getPageTitle()}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Item className="me-3 text-light">
              {adminDetails?.name ? `Welcome, ${adminDetails.name}` : "Welcome, Guest"}
            </Nav.Item>
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={handleLogout}
              style={{ marginLeft: "10px" }}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;