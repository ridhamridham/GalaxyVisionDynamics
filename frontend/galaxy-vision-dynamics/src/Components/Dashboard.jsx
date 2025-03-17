import React from "react";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography as MuiTypography,
  CardMedia,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "./Layout";

function Dashboard() {
  const pages = [
    { title: "Order Food", path: "/food", image: "./Images/FoodMenu.jpg" },
    { title: "Book Room", path: "/room", image: "./Images/rooms.jpg" },
    { title: "Book Activities", path: "/activities", image: "./Images/banquet.jpg" },
  ];

  return (
    <Layout>
      {/* Cards Section */}
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={3} justifyContent="center">
          {pages.map((page, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345, textAlign: "center" }}>
                <CardActionArea component={Link} to={page.path}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={page.image}
                    alt={page.title}
                  />
                  <CardContent>
                    <MuiTypography gutterBottom variant="h5" component="div">
                      {page.title}
                    </MuiTypography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: "#10898d" }}
                      component={Link}
                      to={page.path}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}

export default Dashboard;