import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get teamId from the URL
import Sidebar from "./sidebar"; // Import Sidebar component
import axios from "axios"; // Import axios for API requests
import { API_URL } from "../Constants"; // Assuming the API URL is stored here

const ManageTeamPage = () => {
  const { teamId } = useParams(); // Get teamId from URL parameters
  const [team, setTeam] = useState(null); // State for team details
  const [members, setMembers] = useState([]); // State for team members
  const [loading, setLoading] = useState(true);
  const [noTeamSelected, setNoTeamSelected] = useState(false); // State for when no team is selected

  useEffect(() => {
    if (teamId) {
      // Fetch team details based on teamId from URL
      const fetchTeamData = async () => {
        setLoading(true);
        try {
          // Simulate an API call to fetch team and members
          const response = await axios.get(`${API_URL}/Team/getTeamDetails/${teamId}`);
          setTeam(response.data.data); // Set team details
          setMembers(response.data.members); // Set members list
          setLoading(false);
        } catch (error) {
          console.error("Error fetching team data:", error);
          setLoading(false);
        }
      };
      fetchTeamData();
    } else {
      // If no teamId in URL, show a prompt or default content
      setNoTeamSelected(true);
      setLoading(false);
    }
  }, [teamId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-8">
        {noTeamSelected ? (
          <div className="text-center text-xl text-gray-600">
            <p>No team selected. Please select a team to manage.</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Manage Team</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Team Details</h3>
              <p className="text-lg text-gray-600">
                <strong>Team Name:</strong> {team.name}
              </p>
              <p className="text-lg text-gray-600">
                <strong>Created By:</strong> {team.createdBy}
              </p>
              <p className="text-lg text-gray-600">
                <strong>Team ID:</strong> {team.id}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Team Members</h3>
              <ul className="space-y-3">
                {members.map((member) => (
                  <li key={member.id} className="flex justify-between items-center">
                    <span className="text-lg text-gray-600">{member.name}</span>
                    <button className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300">
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-300">
                Add New Member
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageTeamPage;
