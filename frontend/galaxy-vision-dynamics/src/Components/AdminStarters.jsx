import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";
import Footer from "./footer";

function AdminStarters() {
  const [starters, setStarters] = useState([]);
  const [newStarter, setNewStarter] = useState({
    name: "",
    price: "",
    imgUrl: "",
    foodType: "starter"
  });
  const [editingStarter, setEditingStarter] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/galaxyvision/admin/fooditems?type=starter", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
    .then(response => {
      if (!response.ok) throw new Error("Authentication Failed");
      return response.json();
    })
    .then(data => setStarters(data))
    .catch(error => console.error("Error fetching starters:", error));
  }, []);

  const handleAddStarter = () => {
    fetch("http://localhost:8080/galaxyvision/admin/fooditems/add", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(newStarter),
    })
    .then(response => {
      if (!response.ok) throw new Error("Authentication Failed");
      return response.json();
    })
    .then(data => {
      setStarters([...starters, data]);
      setNewStarter({ ...newStarter, name: "", price: "", imgUrl: "" });
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to add starter. Check your credentials.");
    });
  };

  const handleDeleteStarter = (id) => {
    fetch(`http://localhost:8080/galaxyvision/admin/fooditems/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to delete starter");
      // Remove the deleted starter from the local state
      setStarters(starters.filter(starter => starter.id !== id));
    })
    .catch(error => {
      console.error("Delete Error:", error);
      alert("Failed to delete starter. Please try again.");
    });
  };

  const handleEditStarter = (starter) => {
    setEditingStarter({ ...starter }); // Copy all fields, including foodType
  };

  const handleUpdateStarter = () => {
    fetch(`http://localhost:8080/galaxyvision/admin/fooditems/${editingStarter.id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(editingStarter), // Send the entire editingStarter object
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to update starter");
      return response.json();
    })
    .then(data => {
      setStarters(starters.map(s => s.id === data.id ? data : s)); // Update the local state
      setEditingStarter(null); // Exit edit mode
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to update starter. Please try again.");
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5 pt-3">
        <div className="card shadow-lg p-4 border-0 bg-light rounded">
          <h2 className="text-center mb-4 text-danger">🍽️ Admin Starters</h2>

          {/* Form Section */}
          <div className="mb-4 p-3 bg-white shadow-sm rounded">
            <h4 className="mb-3 text-secondary">➕ Add New Starter</h4>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Starter Name"
                  value={newStarter.name}
                  onChange={(e) => setNewStarter({ ...newStarter, name: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={newStarter.price}
                  onChange={(e) => setNewStarter({ ...newStarter, price: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newStarter.imgUrl}
                  onChange={(e) => setNewStarter({ ...newStarter, imgUrl: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-outline-danger w-100 shadow"
                  onClick={handleAddStarter}
                >
                  Add Starter
                </button>
              </div>
            </div>
          </div>

          {/* Starters List */}
          <table className="table table-hover table-bordered text-center shadow-sm rounded">
            <thead className="bg-danger text-white">
              <tr>
                <th>Image</th>
                <th>Starter Name</th>
                <th>Price</th>
                <th>Image URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {starters.map((starter) => (
                <tr key={starter.id}>
                  <td>
                    <img
                      src={starter.imgUrl}
                      alt={starter.name}
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                  </td>
                  <td className="fw-bold">
                    {editingStarter && editingStarter.id === starter.id ? (
                      <input
                        type="text"
                        value={editingStarter.name}
                        onChange={(e) => setEditingStarter({ ...editingStarter, name: e.target.value })}
                        className="form-control"
                      />
                    ) : (
                      starter.name
                    )}
                  </td>
                  <td className="text-success">
                    {editingStarter && editingStarter.id === starter.id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editingStarter.price}
                        onChange={(e) => setEditingStarter({ ...editingStarter, price: e.target.value })}
                        className="form-control"
                      />
                    ) : (
                      `$${starter.price}`
                    )}
                  </td>
                  <td>
                    {editingStarter && editingStarter.id === starter.id ? (
                      <input
                        type="text"
                        value={editingStarter.imgUrl}
                        onChange={(e) => setEditingStarter({ ...editingStarter, imgUrl: e.target.value })}
                        className="form-control"
                      />
                    ) : (
                      <a href={starter.imgUrl} target="_blank" rel="noopener noreferrer">
                        View Image
                      </a>
                    )}
                  </td>
                  <td>
                    {editingStarter && editingStarter.id === starter.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={handleUpdateStarter}
                        >
                          ✔️ Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingStarter(null)}
                        >
                          ❌ Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditStarter(starter)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteStarter(starter.id)}
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

export default AdminStarters;