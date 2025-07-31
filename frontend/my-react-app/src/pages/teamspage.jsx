import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is used for API requests
import Sidebar from "./sidebar"; // Import Sidebar component
import { createTeam, removeTeam } from "../services/teamService"; // Import the createTeam function
import { API_URL } from "../Constants"; // Import the API URL
import { useNavigate } from "react-router-dom"; // For navigation
import { getAllTasks } from "../services/taskService";
import toast from "react-hot-toast";

const TeamsPage = () => {

  const [teams, setTeams] = useState([]); // State to hold teams data
  const [loading, setLoading] = useState(true); // Loading state
  const [showCreateForm, setShowCreateForm] = useState(false); // State to toggle form visibility
  const [teamName, setTeamName] = useState(""); // State to hold new team name
  const [error, setError] = useState(""); // State to handle errors when creating a team
  
  const [showSuccessModal, setShowSuccessModal] = useState(false); // New state for success modal
  const [successMessage, setSuccessMessage] = useState(""); // Success message

  const navigate = useNavigate(); // Hook for navigation
 
  useEffect(() => {
    // Assuming the user is already logged in and their ID is in localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser) {
      const fetchTeams = async () => {
        try {
          const response = await axios.get(`${API_URL}/Team/getTeam`, {
            params: { userId: loggedInUser.id },
          });

          setTeams(response.data.data); // Assuming response contains an array of teams
        } catch (error) {
          console.error("Error fetching teams:", error);
          setError("An error occurred while fetching teams.");
        } finally {
          setLoading(false);
        }
      };

      fetchTeams();
     
    } else {
      setLoading(false); // Stop loading if no user is found
    }
  }, []); // Run only once on component mount

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (teamName.trim() === "") {
      setError("Team name is required.");
      return;
    }

    // Parse the user ID as an integer
    const userId = parseInt(loggedInUser.id, 10);

    try {
      // Use the createTeam function to make the API call, passing userId as integer
      const response = await createTeam(teamName, userId);

      setTeams((prevTeams) => [...prevTeams, response.data.data]);
      setTeamName(""); // Reset the team name input field
      setShowCreateForm(false); // Close the modal
      setError(""); // Clear any previous errors

      // Show success modal after the team is created
      setSuccessMessage(`Team "${response.data.data.name}" created successfully!`);
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error("Error creating team:", error);
      // Improved error handling
      if (error.response) {
        if (error.response.status === 409) {
          setError("Team name already exists.");
        } else if (error.response.status === 400) {
          setError(error.response.data.message || "Invalid request.");
        } else {
          setError("An error occurred while creating the team.");
        }
      } else {
        setError("Network error or server unreachable.");
      }
    }
  };
const handleDeleteTeam = async (teamId)=>{
  try{
    await removeTeam(teamId)
    toast.success("Team Deleted Successfully")
     const filterTeam = teams.filter((team)=>team.id !== teamId)
     setTeams(filterTeam)
  } catch (error) {
    toast.error("Error in deleting team")
  }
}

  const handleManageTeam = (teamId) => {
    // Navigate to the manage team page
    navigate(`/manageTeam/${teamId}`);
  };

  // If data is still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <div className="bg-white p-8 rounded-xl shadow-xl mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold text-gray-800">Teams</h2>
            <button
              onClick={() => setShowCreateForm(true)} // Show modal when button is clicked
              className="bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition-all duration-300 ease-in-out"
            >
              Create New Team
            </button>
          </div>
          <p className="text-lg text-gray-600">
            Manage your teams, collaborate with your team members, and stay on top of your projects.
          </p>
        </div>

        {/* Teams Grid with Aesthetic Card Styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
          {teams && teams.length > 0 ? (
            teams.map((team) => (
              <div
                key={team.id}
                className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
              >
                {/* Team Card Content */}
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{team.name}</h3>
                <p className="text-gray-600">Created By: {team.createdBy}</p>

                {/* View Team Button */}
                <button
                  onClick={() => handleManageTeam(team.id)} // Pass team id to navigate
                  className="mt-4 bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out mb-3"
                >
                  Manage Team
                </button>

                {/* Delete Team Button */}
                <button
                  onClick={() => handleDeleteTeam(team.id)}
                  className="mt-4 bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300 ease-in-out"
                >
                  Delete Team
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No teams found.</p>
          )}
        </div>
      </div>

      {/* Modal for Creating Team */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Create New Team</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleCreateTeam}>
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-gray-600">
                  Team Name
                </label>
                <input
                  type="text"
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter team name"
                  required
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Create Team
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)} // Close the modal
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">{successMessage}</h3>
            <button
              onClick={() => setShowSuccessModal(false)} // Close the success modal
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
