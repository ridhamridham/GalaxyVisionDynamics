import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";
import Footer from "./footer";

function AdminMainCourse() {
  const [mainCourse, setMainCourse] = useState([]);
  const [newDish, setNewDish] = useState({
    name: "",
    price: "",
    imgUrl: "",
    foodType: "main"
  });
  const [editingDish, setEditingDish] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/galaxyvision/admin/fooditems?type=main", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
    .then(response => {
      if (!response.ok) throw new Error("Authentication Failed");
      return response.json();
    })
    .then(data => setMainCourse(data))
    .catch(error => console.error("Error fetching main course:", error));
  }, []);

  const handleAddDish = () => {
    fetch("http://localhost:8080/galaxyvision/admin/fooditems/add", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(newDish),
    })
    .then(response => {
      if (!response.ok) throw new Error("Authentication Failed");
      return response.json();
    })
    .then(data => {
      setMainCourse([...mainCourse, data]);
      setNewDish({ ...newDish, name: "", price: "", imgUrl: "" });
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to add dish. Check your credentials.");
    });
  };

  const handleDeleteDish = (id) => {
    fetch(`http://localhost:8080/galaxyvision/admin/fooditems/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to delete dish");
      // Remove the deleted dish from the local state
      setMainCourse(mainCourse.filter(dish => dish.id !== id));
    })
    .catch(error => {
      console.error("Delete Error:", error);
      alert("Failed to delete dish. Please try again.");
    });
  };

  const handleEditDish = (dish) => {
    setEditingDish({ ...dish }); // Copy all fields, including foodType
  };

  const handleUpdateDish = () => {
    fetch(`http://localhost:8080/galaxyvision/admin/fooditems/${editingDish.id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(editingDish), // Send the entire editingDish object
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to update dish");
      return response.json();
    })
    .then(data => {
      setMainCourse(mainCourse.map(d => d.id === data.id ? data : d)); // Update the local state
      setEditingDish(null); // Exit edit mode
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to update dish. Please try again.");
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5 pt-3">
        <div className="card shadow-lg p-4 border-0 bg-light rounded">
          <h2 className="text-center mb-4 text-success">🍲 Admin Main Course</h2>

          {/* Form Section */}
          <div className="mb-4 p-3 bg-white shadow-sm rounded">
            <h4 className="mb-3 text-secondary">➕ Add New Dish</h4>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Dish Name"
                  value={newDish.name}
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={newDish.price}
                  onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newDish.imgUrl}
                  onChange={(e) => setNewDish({ ...newDish, imgUrl: e.target.value })}
                  className="form-control rounded shadow-sm"
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-outline-success w-100 shadow"
                  onClick={handleAddDish}
                >
                  Add Dish
                </button>
              </div>
            </div>
          </div>

          {/* Main Course List */}
          <table className="table table-hover table-bordered text-center shadow-sm rounded">
            <thead className="bg-success text-white">
              <tr>
                <th>Image</th>
                <th>Dish Name</th>
                <th>Price</th>
                <th>Image URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mainCourse.map((dish) => (
                <tr key={dish.id}>
                  <td>
                    <img
                      src={dish.imgUrl}
                      alt={dish.name}
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                  </td>
                  <td className="fw-bold">
                    {editingDish && editingDish.id === dish.id ? (
                      <input
                        type="text"
                        value={editingDish.name}
                        onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                        className="form-control"
                      />
                    ) : (
                      dish.name
                    )}
                  </td>
                  <td className="text-success">
                    {editingDish && editingDish.id === dish.id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editingDish.price}
                        onChange={(e) => setEditingDish({ ...editingDish, price: e.target.value })}
                        className="form-control"
                      />
                    ) : (
                      `$${dish.price}`
                    )}
                  </td>
                  <td>
                    {editingDish && editingDish.id === dish.id ? (
                      <input
                        type="text"
                        value={editingDish.imgUrl}
                        onChange={(e) => setEditingDish({ ...editingDish, imgUrl: e.target.value })}
                        className="form-control"
                      />
                    ) : (
                      <a href={dish.imgUrl} target="_blank" rel="noopener noreferrer">
                        View Image
                      </a>
                    )}
                  </td>
                  <td>
                    {editingDish && editingDish.id === dish.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={handleUpdateDish}
                        >
                          ✔️ Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingDish(null)}
                        >
                          ❌ Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditDish(dish)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteDish(dish.id)}
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

export default AdminMainCourse;