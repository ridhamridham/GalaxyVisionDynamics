import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Table, Container, Row, Col, Card, FloatingLabel, Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";
import Footer from "./footer";

function ManageLoyaltyPoints() {
  const [settings, setSettings] = useState({ pointsPerDollar: 10 });
  const [promotions, setPromotions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    userId: "",
    bookingId: "",
    amountSpent: 0,
    pointsEarned: 0,
    pointsUsed: 0,
    reason: "admin_adjustment",
    promotionId: null
  });
  const [newPromotion, setNewPromotion] = useState({
    targetType: "",
    targetId: "",
    extraPoints: 0,
    active: true
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchSettings();
    fetchPromotions();
    fetchTransactions();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/galaxyvision/admin/users", {
        headers: { "Authorization": `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) setUsers(await response.json());
    } catch (err) {
      setError("Failed to load user data");
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch("http://localhost:8080/galaxyvision/admin/loyalty/settings", {
        headers: { "Authorization": `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) setSettings(await response.json());
    } catch (err) {
      setError("Failed to load loyalty settings");
    }
  };

  const fetchPromotions = async () => {
    try {
      const response = await fetch("http://localhost:8080/galaxyvision/admin/promotions", {
        headers: { "Authorization": `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) setPromotions(await response.json());
    } catch (err) {
      setError("Failed to load promotions");
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:8080/galaxyvision/admin/loyalty/transactions", {
        headers: { "Authorization": `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) setTransactions(await response.json());
    } catch (err) {
      setError("Failed to load transactions");
    }
  };

  const handleSettingsUpdate = async () => {
    try {
      const response = await fetch("http://localhost:8080/galaxyvision/admin/loyalty/settings", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(settings)
      });
      if (response.ok) fetchSettings();
    } catch (err) {
      setError("Failed to update settings");
    }
  };

  const handlePromotionSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = newPromotion.id ? "PUT" : "POST";
      const url = newPromotion.id 
        ? `http://localhost:8080/galaxyvision/admin/promotions/${newPromotion.id}`
        : "http://localhost:8080/galaxyvision/admin/promotions";
      
      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(newPromotion)
      });
      
      if (response.ok) {
        fetchPromotions();
        setNewPromotion({ 
          targetType: "", 
          targetId: "", 
          extraPoints: 0, 
          active: true 
        });
      }
    } catch (err) {
      setError("Failed to save promotion");
    }
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/galaxyvision/admin/loyalty/transactions", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(newTransaction)
      });
      if (response.ok) {
        fetchTransactions();
        setNewTransaction({
          userId: "",
          bookingId: "",
          amountSpent: 0,
          pointsEarned: 0,
          pointsUsed: 0,
          reason: "admin_adjustment",
          promotionId: null
        });
      }
    } catch (err) {
      setError("Failed to create transaction");
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/galaxyvision/admin/loyalty/transactions/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) setTransactions(transactions.filter(tx => tx.id !== id));
    } catch (err) {
      setError("Failed to delete transaction");
    }
  };

  const handleDeletePromotion = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/galaxyvision/admin/promotions/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) setPromotions(promotions.filter(p => p.id !== id));
    } catch (err) {
      setError("Failed to delete promotion");
    }
  };

  return (
    <>
      <AdminNavbar />
      <Container fluid className="mt-5 pt-3">
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Tabs defaultActiveKey="transactions" className="mb-4">
          {/* Transactions Tab */}
          <Tab eventKey="transactions" title="💰 Transactions">
            <Row className="g-3">
              <Col lg={4}>
                <Card className="shadow-sm p-4 h-100">
                  <h3 className="mb-4">Add Transaction</h3>
                  <Form onSubmit={handleTransactionSubmit}>
                    <FloatingLabel label="User" className="mb-3">
                      <Form.Select 
                        required 
                        value={newTransaction.userId}
                        onChange={(e) => {
                          const user = users.find(u => u.id === parseInt(e.target.value));
                          setSelectedUser(user);
                          setNewTransaction({ 
                            ...newTransaction, 
                            userId: e.target.value,
                            pointsEarned: newTransaction.amountSpent * settings.pointsPerDollar
                          });
                        }}
                      >
                        <option value="">Select User</option>
                        {users.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.name} (ID: {user.id})
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel label="Amount Spent ($)" className="mb-3">
                      <Form.Control
                        type="number"
                        step="0.01"
                        value={newTransaction.amountSpent}
                        onChange={(e) => {
                          const amount = e.target.value;
                          setNewTransaction({
                            ...newTransaction,
                            amountSpent: amount,
                            pointsEarned: amount * settings.pointsPerDollar
                          });
                        }}
                      />
                    </FloatingLabel>

                    <FloatingLabel label="Points Used" className="mb-3">
                      <Form.Control
                        type="number"
                        value={newTransaction.pointsUsed}
                        onChange={(e) => setNewTransaction({ 
                          ...newTransaction, 
                          pointsUsed: e.target.value 
                        })}
                      />
                    </FloatingLabel>

                    <FloatingLabel label="Promotion" className="mb-3">
                      <Form.Select
                        value={newTransaction.promotionId || ""}
                        onChange={(e) => {
                          const promo = promotions.find(p => p.id === parseInt(e.target.value));
                          setNewTransaction({
                            ...newTransaction,
                            promotionId: promo.id,
                            pointsEarned: newTransaction.pointsEarned + promo.extraPoints
                          });
                        }}
                      >
                        <option value="">No Promotion</option>
                        {promotions.map(promo => (
                          <option key={promo.id} value={promo.id}>
                            {promo.targetType} #{promo.targetId} (+{promo.extraPoints})
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>

                    <Button variant="primary" type="submit" className="w-100">
                      Add Transaction
                    </Button>
                  </Form>
                </Card>
              </Col>

              <Col lg={8}>
                <Card className="shadow-sm p-4">
                  <h3 className="mb-4">Transaction History</h3>
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Earned</th>
                        <th>Used</th>
                        <th>Balance</th>
                        <th>Reason</th>
                        <th>Promotion</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(tx => (
                        <tr key={tx.id}>
                          <td>{users.find(u => u.id === tx.userId)?.name || "N/A"}</td>
                          <td>${tx.amountSpent}</td>
                          <td>+{tx.pointsEarned}</td>
                          <td>-{tx.pointsUsed}</td>
                          <td>{tx.balanceAfterTransaction}</td>
                          <td>{tx.reason.replace(/_/g, ' ')}</td>
                          <td>{tx.promotion?.targetType || "N/A"}</td>
                          <td>
                            <Button 
                              variant="danger" 
                              size="sm" 
                              onClick={() => handleDeleteTransaction(tx.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Tab>

          {/* Promotions Tab */}
          <Tab eventKey="promotions" title="🎁 Promotions">
            <Row className="g-3">
              <Col lg={4}>
                <Card className="shadow-sm p-4 h-100">
                  <h3 className="mb-4">{newPromotion.id ? "Edit" : "Add"} Promotion</h3>
                  <Form onSubmit={handlePromotionSubmit}>
                    <FloatingLabel label="Target Type" className="mb-3">
                      <Form.Select
                        required
                        value={newPromotion.targetType}
                        onChange={(e) => setNewPromotion({ 
                          ...newPromotion, 
                          targetType: e.target.value 
                        })}
                      >
                        <option value="">Select Type</option>
                        <option value="ACTIVITY">Activity</option>
                        <option value="ROOM">Room</option>
                        <option value="FOOD">Food Item</option>
                      </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel label="Target ID" className="mb-3">
                      <Form.Control
                        type="number"
                        required
                        value={newPromotion.targetId}
                        onChange={(e) => setNewPromotion({ 
                          ...newPromotion, 
                          targetId: e.target.value 
                        })}
                      />
                    </FloatingLabel>

                    <FloatingLabel label="Extra Points" className="mb-3">
                      <Form.Control
                        type="number"
                        required
                        value={newPromotion.extraPoints}
                        onChange={(e) => setNewPromotion({ 
                          ...newPromotion, 
                          extraPoints: e.target.value 
                        })}
                      />
                    </FloatingLabel>

                    <FloatingLabel label="Status" className="mb-3">
                      <Form.Select
                        value={newPromotion.active}
                        onChange={(e) => setNewPromotion({ 
                          ...newPromotion, 
                          active: e.target.value === "true" 
                        })}
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </Form.Select>
                    </FloatingLabel>

                    <Button variant="primary" type="submit" className="w-100">
                      {newPromotion.id ? "Update Promotion" : "Add Promotion"}
                    </Button>
                  </Form>
                </Card>
              </Col>

              <Col lg={8}>
                <Card className="shadow-sm p-4">
                  <h3 className="mb-4">Active Promotions</h3>
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Target ID</th>
                        <th>Extra Points</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promotions.map(promo => (
                        <tr key={promo.id}>
                          <td>{promo.targetType}</td>
                          <td>#{promo.targetId}</td>
                          <td>+{promo.extraPoints}</td>
                          <td>{promo.active ? "Active" : "Inactive"}</td>
                          <td>
                            <Button 
                              variant="warning" 
                              size="sm" 
                              onClick={() => setNewPromotion(promo)}
                              className="me-2"
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm" 
                              onClick={() => handleDeletePromotion(promo.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Tab>

          {/* Settings Tab */}
          <Tab eventKey="settings" title="⚙️ Settings">
            <Card className="shadow-sm p-4">
              <h3 className="mb-4">Loyalty Program Settings</h3>
              <Row className="g-3">
                <Col md={6}>
                  <FloatingLabel label="Points per dollar">
                    <Form.Control
                      type="number"
                      step="0.1"
                      value={settings.pointsPerDollar}
                      onChange={(e) => setSettings({ 
                        ...settings, 
                        pointsPerDollar: e.target.value 
                      })}
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <Button 
                    variant="success" 
                    onClick={handleSettingsUpdate}
                    className="w-100"
                  >
                    Update Settings
                  </Button>
                </Col>
              </Row>
            </Card>
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </>
  );
}

export default ManageLoyaltyPoints;