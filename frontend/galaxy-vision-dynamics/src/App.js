import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Booking from "./Booking";
import Login from "./Login";
import Registration from "./Registration";
import "./App.css";
import ForgotPassword from "./ForgotPassword";
import UpdatePassword from "./UpdatePassword";

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
          <Route path="/UpdatePassword" element={<UpdatePassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
