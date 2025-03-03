import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Booking from "./Booking";
import Login from "./Login";
import Registration from "./Registration";
import "./App.css";
import ForgotPassword from "./ForgotPassword";
import UpdatePassword from "./UpdatePassword";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import AdminDashboard from "./Components/AdminDashboard";
import AdminLogin from "./Components/AdminLogin";
import AdminManageActivities from "./Components/AdminManageActivities";
import AdminManageRooms from "./Components/AdminManageRooms";
import AdminManageFoodOrders from "./Components/AdminManageFoodOrders";
import AdminManageUsers from "./Components/AdminManageUsers";
import AdminManageFoodMenu from "./Components/FoodMenu";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<UpdatePassword />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/manage-rooms" element={<AdminManageRooms />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/adminManageUsers" element={<AdminManageUsers />} />
          <Route path="/adminFoodMenuitems" element={<AdminManageFoodMenu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
