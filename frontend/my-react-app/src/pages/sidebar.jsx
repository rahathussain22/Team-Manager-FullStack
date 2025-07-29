import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    navigate("/login"); // Redirect to login page
  };

  // Function to apply active class based on the current location
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-blue-300 font-semibold" // Active link styling
      : "hover:text-blue-300"; // Inactive link styling
  };

  return (
    <div className="w-1/4 bg-blue-500 text-white p-4 min-h-screen flex flex-col">
      {/* Centered Dashboard Text with Border */}
      <div className="flex items-center justify-center border-b-2 border-opacity-50 border-white py-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      <ul className="mt-8 flex-grow">
        {/* Home Link */}
        <li className="mb-4">
          <a href="/home" className={`transition duration-200 ${getLinkClass("/home")}`}>
            Home
          </a>
        </li>

        {/* Teams Link */}
        <li className="mb-4">
          <a href="/teams" className={`transition duration-200 ${getLinkClass("/teams")}`}>
            Teams
          </a>
        </li>
        
        {/* Manage Team Link */}
        <li className="mb-4">
          <a href="/manageTeam" className={`transition duration-200 ${getLinkClass("/manageTeam")}`}>
            Manage Team
          </a>
        </li>

        {/* Tasks Link */}
        <li className="mb-4">
          <a href="/tasks" className={`transition duration-200 ${getLinkClass("/tasks")}`}>
            Tasks
          </a>
        </li>
      </ul>

      {/* Logout Button at the Bottom */}
      <div className="mt-auto">
        <button
          className="bg-red-500 w-full py-2 rounded-md hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
