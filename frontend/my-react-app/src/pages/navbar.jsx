import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../services/authService"; // Import the logout function

const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Call the logout function from authService.js
      await logout(); // This will log the user out and clear localStorage

      alert("You have been logged out!");
      navigate("/login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white font-semibold text-xl">Team Manager</h1>
        <div className="space-x-4">
          {/* Links to Teams and Tasks */}
          <Link to="/teams" className="text-white hover:text-blue-200">
            Teams
          </Link>
          <Link to="/tasks" className="text-white hover:text-blue-200">
            Tasks
          </Link>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={loading} // Disable button during logout process
          >
            {loading ? "Logging Out..." : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
