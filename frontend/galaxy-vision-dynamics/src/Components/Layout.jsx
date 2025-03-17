import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";

function Layout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false); // Left drawer state
  const [openRightDrawer, setOpenRightDrawer] = useState(false); // Right drawer state

  // Fetch user details from localStorage
  const user = JSON.parse(localStorage.getItem("userDetails")) || {
    name: "Guest",
    email: "guest@example.com",
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#10898d" }}>
        <Toolbar>
          {/* Left Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GalaxyVision Resort
          </Typography>

          {/* User Icon (Right Side) */}
          <IconButton color="inherit" onClick={() => setOpenRightDrawer(true)}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar */}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/food">
            <ListItemText primary="Order Food" />
          </ListItem>
          <ListItem button component={Link} to="/room">
            <ListItemText primary="Book Room" />
          </ListItem>
          <ListItem button component={Link} to="/banquet">
            <ListItemText primary="Book Banquet" />
          </ListItem>
          <ListItem button component={Link} to="/pool">
            <ListItemText primary="Pool Access" />
          </ListItem>
        </List>
      </Drawer>

      {/* Right Sidebar */}
      <Drawer
        anchor="right" // Position on the right
        open={openRightDrawer}
        onClose={() => setOpenRightDrawer(false)}
      >
        <List sx={{ width: 250 }}>
          {/* User Info */}
          <ListItem>
            <ListItemText
              primary={user.name}
              secondary={user.email}
              sx={{ textAlign: "center" }}
            />
          </ListItem>

          {/* Cart */}
          <ListItem button component={Link} to="/cart">
            <ShoppingCartIcon sx={{ mr: 2 }} />
            <ListItemText primary="Cart" />
          </ListItem>

          {/* Order History */}
          <ListItem button component={Link} to="/order-history">
            <HistoryIcon sx={{ mr: 2 }} />
            <ListItemText primary="Order History" />
          </ListItem>

          {/* Logout */}
          <ListItem button onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 2 }} />
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Page Content */}
      <div style={{ marginTop: "64px", padding: "20px" }}>{children}</div>
    </>
  );
}

export default Layout;