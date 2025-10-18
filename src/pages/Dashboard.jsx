import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Fetch user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "consumer"; // fallback to consumer

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">
          {role === "business-owner"
            ? "Business Owner Dashboard"
            : "Your Deals Dashboard"}
        </h1>

        {/* BUSINESS OWNER DASHBOARD */}
        {role === "business-owner" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <DashboardCard
              title="➕ Add New Deal"
              description="Post a new offer for your store."
              onClick={() => navigate("/add-deal")}
            />
            <DashboardCard
              title="📜 My Deals"
              description="View, edit, or delete your posted deals."
              onClick={() => navigate("/my-deals")}
            />
            <DashboardCard
              title="📈 Analytics"
              description="See total deals, views, and performance."
              onClick={() => navigate("/analytics")}
            />
          </div>
        )}

        {/* CONSUMER DASHBOARD */}
        {role === "consumer" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <DashboardCard
              title="🧾 Shopping List"
              description="Manage your grocery list."
              onClick={() => navigate("/shopping-list")}
            />
            <DashboardCard
              title="💡 Recommended Deals"
              description="Deals that match your shopping list."
              onClick={() => navigate("/recommended-deals")}
            />
            <DashboardCard
              title="📍 Nearby Deals"
              description="Find the best offers around your area."
              onClick={() => navigate("/nearby")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ Reusable Card Component
function DashboardCard({ title, description, onClick }) {
  return (
    <div
      className="bg-white border rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all p-6 text-center flex flex-col items-center justify-center hover:bg-blue-50"
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold text-primary mb-2">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}