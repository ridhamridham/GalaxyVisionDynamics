import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";
import Footer from "./footer";

function AdminDesserts() {
  const [desserts, setDesserts] = useState([]);
  const [newDessert, setNewDessert] = useState({
    name: "",
    price: "",
    imgUrl: "",
    foodType: "dessert"
  });
  const [editingDessert, setEditingDessert] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/galaxyvision/admin/fooditems?type=dessert", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
    .then(response => {
      if (!response.ok) throw new Error("Authentication Failed");
      return response.json();
    })
    .then(data => setDesserts(data))
    .catch(error => console.error("Error fetching desserts:", error));
  }, []);

  const handleAddDessert = () => {
    fetch("http://localhost:8080/galaxyvision/admin/fooditems/add", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(newDessert),
    })
    .then(response => {
      if (!response.ok) throw new Error("Authentication Failed");
      return response.json();
    })
    .then(data => {
      setDesserts([...desserts, data]);
      setNewDessert({ ...newDessert, name: "", price: "", imgUrl: "" });
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to add dessert. Check your credentials.");
    });
  };

  const handleDeleteDessert = (id) => {
    fetch(`http://localhost:8080/galaxyvision/admin/fooditems/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to delete dessert");
      // Remove the deleted dessert from the local state
      setDesserts(desserts.filter(dessert => dessert.id !== id));
    })
    .catch(error => {
      console.error("Delete Error:", error);
      alert("Failed to delete dessert. Please try again.");
    });
  };

  const handleEditDessert = (dessert) => {
    setEditingDessert({ ...dessert }); // Copy all fields, including foodType
  };

  const handleUpdateDessert = () => {
    fetch(`http://localhost:8080/galaxyvision/admin/fooditems/${editingDessert.id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(editingDessert), // Send the entire editingDessert object
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to update dessert");
      return response.json();
    })
    .then(data => {
      setDesserts(desserts.map(d => d.id === data.id ? data : d)); // Update the local state
      setEditingDessert(null); // Exit edit mode
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to update dessert. Please try again.");
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5 pt-3">
        <div className="card shadow-lg p-4 border-0 bg-light rounded">
          <h2 className="text-center mb-4 text-dark">🍩 Admin Desserts</h2>

          {/* Form Section */}
          <div className="mb-4 p-3 bg-white shadow-sm rounded">
            <h4 className="mb-3 text-secondary">➕ Add New Dessert</h4>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Dessert Name"
                  value={newDessert.name}
                  onChange={(e) => setNewDessert({ ...newDessert, name: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={newDessert.price}
                  onChange={(e) => setNewDessert({ ...newDessert, price: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newDessert.imgUrl}
                  onChange={(e) => setNewDessert({ ...newDessert, imgUrl: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-outline-warning w-100 shadow"
                  onClick={handleAddDessert}
                >
                  Add Dessert
                </button>
              </div>
            </div>
          </div>

          {/* Desserts List */}
          <table className="table table-hover table-bordered text-center shadow-sm rounded">
            <thead className="bg-pink text-white">
              <tr>
                <th>Image</th>
                <th>Dessert Name</th>
                <th>Price</th>
                <th>Image URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {desserts.map((dessert) => (
                <tr key={dessert.id}>
                  <td>
                    <img
                      src={dessert.imgUrl}
                      alt={dessert.name}
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                  </td>
                  <td className="fw-bold">
                    {editingDessert && editingDessert.id === dessert.id ? (
                      <input
                        type="text"
                        value={editingDessert.name}
                        onChange={(e) => setEditingDessert({ ...editingDessert, name: e.target.value })}
                        className="form-control"
                      />
                    ) : (
                      dessert.name
                    )}
                  </td>
                  <td className="text-success">
                    {editingDessert && editingDessert.id === dessert.id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editingDessert.price}
                        onChange={(e) => setEditingDessert({ ...editingDessert, price: e.target.value })}
                        className="form-control"
                      />
                    ) : (
                      `$${dessert.price}`
                    )}
                  </td>
                  <td>
                    {editingDessert && editingDessert.id === dessert.id ? (
                      <input
                        type="text"
                        value={editingDessert.imgUrl}
                        onChange={(e) => setEditingDessert({ ...editingDessert, imgUrl: e.target.value })}
                        className="form-control"
                      />
                    ) : (
                      <a href={dessert.imgUrl} target="_blank" rel="noopener noreferrer">
                        View Image
                      </a>
                    )}
                  </td>
                  <td>
                    {editingDessert && editingDessert.id === dessert.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={handleUpdateDessert}
                        >
                          ✔️ Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingDessert(null)}
                        >
                          ❌ Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditDessert(dessert)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteDessert(dessert.id)}
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDesserts;