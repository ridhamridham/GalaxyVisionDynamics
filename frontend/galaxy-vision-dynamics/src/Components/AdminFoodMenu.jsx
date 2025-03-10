import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Ensure React Router is used
import AdminNavbar from "./AdminNavbar";
import FoodMenuNavbar from "./FoodMenuNavbar";
import Footer from "./footer";
const menuItems = {
  FoodItems: [
    {
      name: "Drinks",
      link: "/AdminDrinksMenu",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvHxcR8STruNwo2t-Bz4Y-df8WtH_huUbjlA&s",
    },
    {
      name: "Starters",
      link: "/AdminStarters",
      image:
        "https://i0.wp.com/www.russianfilipinokitchen.com/wp-content/uploads/2015/04/crispy-fried-calamari-01.jpg",
    },
    {
      name: "Main Course",
      link: "/AdminMainCource",
      image:
        "https://thecurrymommy.com/wp-content/uploads/2021/09/butter-paneer-masala-one-pot.jpg",
    },
    {
      name: "Desserts",
      link: "/AdminDesserts",
      image:
        "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2024/09/THUMB-VIDEO-2_rev1-56.jpeg?im=Resize,width=742;",
    },
  ],
};
function MenuItem({ name, link, image }) {
  return (
    <Card className="mb-4 d-flex flex-column" style={{ height: "100%" }}>
      <Card.Img
        variant="top"
        src={image}
        alt={name}
        style={{ height: "240px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button as={Link} to={link} variant="dark" className="w-100">
          Go to {name}
        </Button>
      </Card.Body>
    </Card>
  );
}
function MenuSection({ title, items }) {
  return (
    <>
      <h2 className="mt-4 mb-3">{title}</h2>
      <Row>
        {items.map((item, index) => (
          <Col key={index} md={6} lg={3}>
            <MenuItem {...item} />
          </Col>
        ))}
      </Row>
      <br />
    </>
  );
}

function AdminFoodMenu() {
  return (
    <>
      <AdminNavbar />
      <FoodMenuNavbar />
      <Container>
        <MenuSection title="Food Items" items={menuItems.FoodItems} />
      </Container>
      <br></br>
      <Footer />
    </>
  );
}
export default AdminFoodMenu;
