import React, { useState, useEffect } from "react";

function FoodMenu() {
  const [foodItems, setFoodItems] = useState([]);

  // Fetch food menu data
  useEffect(() => {
    fetch("/api/food-menu") // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setFoodItems(data))
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  // Handle delete operation
  const handleDelete = (id) => {
    fetch(`/api/food-menu/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setFoodItems(foodItems.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  // Handle update operation
  const handleUpdate = (id) => {
    alert(`Updating food item with id: ${id}`);
  };

  // Handle create operation
  const handleCreate = () => {
    alert("Creating new food item");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-dark">Food Menu</h2>
      <button className="btn btn-success mb-4" onClick={handleCreate}>
        Create New Food Item
      </button>
      <div className="row">
        {foodItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">
                  <strong>Price: ${item.price}</strong>
                </p>
                <p className="card-text text-muted">
                  Created at: {new Date(item.created_at).toLocaleString()}
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-info">Read</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodMenu;
