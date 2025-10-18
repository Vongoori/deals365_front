import React, { useState } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust the path as needed

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("http://localhost:5050/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await res.json();
    console.log("Response: ", data);
    if (!res.ok) throw new Error(data.error);
    alert("Login Successful");
    // localStorage.setItem("token", data.accessToken);
    // localStorage.setItem("user", JSON.stringify(data.user));
     // ✅ Use AuthContext instead of manually setting localStorage
    const userData = { ...data.user, token: data.accessToken };
    login(userData);
    navigate("/dashboard");
  } catch (err) {
    setError(err.message);
  }
};

return (
  <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-md m-4">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Login</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email id" />
        <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password"/>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-purple-500 transition mb-6"
        >
          Login
        </button>
        <button
          type="cancel"
          className="w-full bg-white border text-black py-2 rounded-lg hover:bg-primary hover:text-white transition"
        >
          Cancel
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-700">
        Don’t have an account?{" "}
        <span
          className="text-primary cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  </div>
);
}