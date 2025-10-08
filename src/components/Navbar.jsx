import {Link}  from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center px-6 py-3">
      <Link to="/" className="text-xl font-bold">Deals365</Link>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
             <Link to="/nearby">Nearby</Link>
          </>
        )}

        {user && user.role === "user" && (
          <>
            <Link to="/">Home</Link>
            <Link to="/shopping-list">Shopping List</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}

        {user && user.role === "store" && (
          <>
            <Link to="/my-deals">My Deals</Link>
            <Link to="/add-deal">Add Deal</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}

        {user && (
          <button
            onClick={logout}
            className="ml-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;