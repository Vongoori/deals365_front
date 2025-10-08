import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider  from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DealsNearby from "./pages/DealsNearby";
import AddDeal from "./pages/AddDeal";
import MyDeals from "./pages/MyDeals";
import ShoppingList from "./pages/ShoppingList";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
     <AuthProvider>
    <Router>
        <Navbar />
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/nearby" element={<DealsNearby />} />
          {/* USER Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            
            <Route path="/shopping-list" element={<ShoppingList />} />
          </Route>

          {/* STORE Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={["store"]} />}>
            <Route path="/add-deal" element={<AddDeal />} />
            <Route path="/my-deals" element={<MyDeals />} />
          </Route>

          {/* Common Protected Routes (both roles) */}
          <Route element={<PrivateRoute allowedRoles={["user", "store"]} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

        </Routes>
      </Router>
   
      
    </AuthProvider>
  );
};

export default App;