import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar"; // Import the Navbar component

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (i.e., user data exists in localStorage)
    const loggedInUser = localStorage.getItem("user");

    if (!loggedInUser) {
      // If not logged in, redirect to login page
      navigate("/login");
    } else {
      setUser(JSON.parse(loggedInUser));
    }
  }, [navigate]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar /> {/* Include the Navbar component */}
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Welcome to Your Home Page
          </h2>
          {user ? (
            <div>
              <p className="text-lg text-gray-600 mb-4">
                Hello, {user.name}!
              </p>
              <p className="text-sm text-gray-500">
                You have successfully logged in. Enjoy your experience.
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Redirecting...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
