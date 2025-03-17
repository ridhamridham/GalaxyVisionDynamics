import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import "./App.css";
import "./styles/main.css";
import ForgotPassword from "./ForgotPassword";
import UpdatePassword from "./UpdatePassword";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminDashboard from "./Components/AdminDashboard";
import AdminLogin from "./Components/AdminLogin";
import AdminManageActivities from "./Components/AdminManageActivities";
import AdminManageRooms from "./Components/AdminManageRooms";
import AdminManageFoodOrders from "./Components/AdminManageFoodOrders";
import AdminManageUsers from "./Components/AdminManageUsers";
import AdminManageFoodMenu from "./Components/FoodMenu";
import FoodMenu from "./Components/FoodMenu";
import AdminFoodMenuNavbar from "./Components/FoodMenuNavbar";
import DrinksMenu from "./Components/DrinksMenu";
import MainCourse from "./Components/MainCourse";
import Desserts from "./Components/Desserts";
import Starters from "./Components/Starter";
import ManageLoyalityPoints from "./Components/ManageLoyalityPoints";
import CartPage from "./Components/CartPage";
import { CartProvider } from "./Context/CartContext";
import AdminDesserts from "./Components/AdminDesserts";
import AdminDrinksMenu from "./Components/AdminDrinksMenu";
import AdminMainCource from "./Components/AdminMainCource";
import AdminStarters from "./Components/AdminStarters";
import AdminFoodMenu from "./Components/AdminFoodMenu";
import Room from "./Components/Room";
import Food from "./Components/Food";
import Activities from "./Components/Activities";
import Booking from "./Components/Booking";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<UpdatePassword />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/FoodMenuitems" element={<FoodMenu />} />
          <Route path="/DrinkMenu" element={<DrinksMenu />} />
          <Route path="/MainCourse" element={<MainCourse />} />
          <Route path="/desserts" element={<Desserts />} />
          <Route path="/starters" element={<Starters />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/manageLoyalityPoints"
            element={<ManageLoyalityPoints />}
          />
          <Route
            path="/manage-activities"
            element={<AdminManageActivities />}
          />
          <Route
            path="/adminmanageFoodorders"
            element={<AdminManageFoodOrders />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/manage-rooms" element={<AdminManageRooms />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/adminManageUsers" element={<AdminManageUsers />} />
            <Route path="/AdminDesserts" element={<AdminDesserts />} />
            <Route path="/AdminDrinksMenu" element={<AdminDrinksMenu />} />
            <Route path="/AdminMainCource" element={<AdminMainCource />} />
            <Route path="/AdminStarters" element={<AdminStarters />} />
            <Route path="/AdminFoodMenu" element={<AdminFoodMenu />} />
            <Route path="/FoodMenuNavbar" element={<AdminFoodMenuNavbar />} />
          </Route>
          <Route path="/room" element={<Room />} />
          <Route path="/food" element={<Food />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/booking" element={<Booking />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
