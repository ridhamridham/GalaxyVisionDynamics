import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Table, Container, Row, Col, Card, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";
import Footer from "./footer";

function AdminManageActivities() {
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    availableTime: "",
  });
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch("http://localhost:8080/galaxyvision/admin/activities", {
        headers: { "Authorization": `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (!response.ok) throw new Error("Authentication Failed");
      setActivities(await response.json());
    } catch (err) {
      setError("Failed to load activities");
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim() || 
        formData.price <= 0 || !formData.availableTime.trim()) {
      setError("Please fill all fields with valid information");
      return;
    }
    
    const method = editingId ? "PUT" : "POST";
    const url = editingId 
      ? `http://localhost:8080/galaxyvision/admin/activities/${editingId}`
      : "http://localhost:8080/galaxyvision/admin/activities";

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        setActivities(prev => 
          editingId 
            ? prev.map(act => act.id === editingId ? data : act)
            : [...prev, data]
        );
        setFormData({ 
          name: "", 
          description: "", 
          price: "", 
          availableTime: "" 
        });
        setEditingId(null);
        setError("");
      } else {
        setError("Failed to save activity");
      }
    } catch (err) {
      setError("Network error. Check your connection");
    }
  };

  const handleEdit = (activity) => {
    setFormData({
      name: activity.name,
      description: activity.description,
      price: activity.price.toString(),
      availableTime: activity.availableTime
    });
    setEditingId(activity.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/galaxyvision/admin/activities/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem('adminToken')}` }
      });
      
      if (response.ok) {
        setActivities(activities.filter(act => act.id !== id));
      } else {
        setError("Failed to delete activity");
      }
    } catch (err) {
      setError("Network error. Check your connection");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container-fluid mt-5 pt-3">
        {error && <Alert variant="danger" className="mx-auto w-75">{error}</Alert>}

        <Row className="justify-content-center mb-5">
          <Col lg={15} xl={8}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <Card.Title className="text-center mb-4 fs-2 text-primary">
                  {editingId ? "Edit Activity" : "Add New Activity"}
                </Card.Title>
                <Form onSubmit={handleAddOrUpdate} className="p-4">
                  <FloatingLabel label="Activity Name" className="mb-4">
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Enter activity name"
                      size="lg"
                      className="rounded-pill"
                    />
                  </FloatingLabel>

                  <FloatingLabel label="Description" className="mb-4">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      placeholder="Enter activity description"
                      size="lg"
                      className="rounded-pill"
                    />
                  </FloatingLabel>

                  <Row className="g-3 mb-4">
                    <Col md={6}>
                      <FloatingLabel label="Price ($)">
                        <Form.Control
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          required
                          min="1"
                          placeholder="Enter price"
                          size="lg"
                          className="rounded-pill"
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md={6}>
                      <FloatingLabel label="Available Timing">
                        <Form.Control
                          type="text"
                          value={formData.availableTime}
                          onChange={(e) => setFormData({ ...formData, availableTime: e.target.value })}
                          required
                          placeholder="e.g., 9:00 AM - 5:00 PM"
                          size="lg"
                          className="rounded-pill"
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      className="rounded-pill shadow"
                    >
                      {editingId ? "Update Activity" : "Add Activity"}
                    </Button>
                    {editingId && (
                      <Button 
                        variant="secondary" 
                        onClick={() => setFormData({ 
                          name: "", 
                          description: "", 
                          price: "", 
                          availableTime: "" 
                        })}
                        size="lg"
                        className="rounded-pill"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={10} xl={9}>
            <Table 
              striped 
              bordered 
              hover 
              responsive 
              className="shadow-sm text-center align-middle"
            >
              <thead className="bg-primary text-white">
                <tr>
                  <th className="fs-5">No.</th>
                  <th className="fs-5">Activity Name</th>
                  <th className="fs-5">Description</th>
                  <th className="fs-5">Price</th>
                  <th className="fs-5">Timing</th>
                  <th className="fs-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id} className="align-middle">
                    <td>{index + 1}</td>
                    <td className="fw-bold">{activity.name}</td>
                    <td>{activity.description}</td>
                    <td className="text-success fs-5">${activity.price}</td>
                    <td className="text-warning">{activity.availableTime}</td>
                    <td>
                      <Button 
                        variant="warning" 
                        size="lg" 
                        onClick={() => handleEdit(activity)}
                        className="me-3 rounded-pill"
                      >
                        ✏️ Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        size="lg" 
                        onClick={() => handleDelete(activity.id)}
                        className="rounded-pill"
                      >
                        🗑️ Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default AdminManageActivities;