import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";
import Footer from "./footer";

function AdminDrinksMenu() {
  const [drinks, setDrinks] = useState([]);
  const [newDrink, setNewDrink] = useState({
    name: "",
    price: "",
    imgUrl: "",
    foodType: "drink"
  });
  const [editingDrink, setEditingDrink] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/galaxyvision/admin/fooditems?type=drink", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
    .then(response => {
      if (!response.ok) throw new Error("Authentication Failed");
      return response.json();
    })
    .then(data => setDrinks(data))
    .catch(error => console.error("Error fetching drinks:", error));
  }, []);

  const handleAddDrink = () => {
    fetch("http://localhost:8080/galaxyvision/admin/fooditems/add", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(newDrink),
    })
    .then(response => {
      if (!response.ok) throw new Error("Authentication Failed");
      return response.json();
    })
    .then(data => {
      setDrinks([...drinks, data]);
      setNewDrink({ ...newDrink, name: "", price: "", imgUrl: "" });
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to add drink. Check your credentials.");
    });
  };

  const handleDeleteDrink = (id) => {
    fetch(`http://localhost:8080/galaxyvision/admin/fooditems/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to delete drink");
      // Remove the deleted drink from the local state
      setDrinks(drinks.filter(drink => drink.id !== id));
    })
    .catch(error => {
      console.error("Delete Error:", error);
      alert("Failed to delete drink. Please try again.");
    });
  };

  const handleEditDrink = (drink) => {
    setEditingDrink({ ...drink }); // Copy all fields, including foodType
  };

  const handleUpdateDrink = () => {
    fetch(`http://localhost:8080/galaxyvision/admin/fooditems/${editingDrink.id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(editingDrink), // Send the entire editingDrink object
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to update drink");
      return response.json();
    })
    .then(data => {
      setDrinks(drinks.map(d => d.id === data.id ? data : d)); // Update the local state
      setEditingDrink(null); // Exit edit mode
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to update drink. Please try again.");
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5 pt-3">
        <div className="card shadow-lg p-4 border-0">
          <h2 className="text-center mb-4 text-info">🍹 Admin Drinks Menu</h2>

          {/* Form Section */}
          <div className="mb-4 p-3 bg-light shadow-sm rounded">
            <h4 className="mb-3 text-secondary">➕ Add New Drink</h4>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Drink Name"
                  value={newDrink.name}
                  onChange={(e) => setNewDrink({ ...newDrink, name: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={newDrink.price}
                  onChange={(e) => setNewDrink({ ...newDrink, price: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newDrink.imgUrl}
                  onChange={(e) => setNewDrink({ ...newDrink, imgUrl: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-outline-info w-100 shadow"
                  onClick={handleAddDrink}
                >
                  Add Drink
                </button>
              </div>
            </div>
          </div>

          {/* Drinks List */}
          <div className="table-responsive">
            <table className="table table-hover table-bordered text-center shadow-sm rounded">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Image</th>
                  <th>Drink Name</th>
                  <th>Price</th>
                  <th>Image URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drinks.map((drink) => (
                  <tr key={drink.id}>
                    <td>
                      <img
                        src={drink.imgUrl}
                        alt={drink.name}
                        width="50"
                        height="50"
                        className="rounded-circle"
                      />
                    </td>
                    <td className="fw-bold">
                      {editingDrink && editingDrink.id === drink.id ? (
                        <input
                          type="text"
                          value={editingDrink.name}
                          onChange={(e) => setEditingDrink({ ...editingDrink, name: e.target.value })}
                          className="form-control"
                        />
                      ) : (
                        drink.name
                      )}
                    </td>
                    <td className="text-success">
                      {editingDrink && editingDrink.id === drink.id ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editingDrink.price}
                          onChange={(e) => setEditingDrink({ ...editingDrink, price: e.target.value })}
                          className="form-control"
                        />
                      ) : (
                        `$${drink.price}`
                      )}
                    </td>
                    <td>
                      {editingDrink && editingDrink.id === drink.id ? (
                        <input
                          type="text"
                          value={editingDrink.imgUrl}
                          onChange={(e) => setEditingDrink({ ...editingDrink, imgUrl: e.target.value })}
                          className="form-control"
                        />
                      ) : (
                        <a href={drink.imgUrl} target="_blank" rel="noopener noreferrer">
                          View Image
                        </a>
                      )}
                    </td>
                    <td>
                      {editingDrink && editingDrink.id === drink.id ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={handleUpdateDrink}
                          >
                            ✔️ Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditingDrink(null)}
                          >
                            ❌ Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEditDrink(drink)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteDrink(drink.id)}
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
      </div>
      <Footer />
    </>
  );
}

export default AdminDrinksMenu;