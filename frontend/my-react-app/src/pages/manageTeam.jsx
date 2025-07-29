import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get teamId from the URL
import Sidebar from "./sidebar"; // Import Sidebar component

import { findTeam } from "../services/teamService";
import { addMember, getMember, removeMember } from "../services/manageTeam";
import { getUsers } from "../services/userService";

const ManageTeamPage = () => {
  const { teamId } = useParams(); // Get teamId from URL parameters
  const [team, setTeam] = useState({}); // State for team details
  const [members, setMembers] = useState([]); // State for team members
  const [listOfUsers, setListOfUsers] = useState([]); // List of users to add
  const [loading, setLoading] = useState(true);
  const [noTeamSelected, setNoTeamSelected] = useState(false); // State for when no team is selected
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
  const [selectedRole, setSelectedRole] = useState(""); // State for the selected role
  const user = JSON.parse(localStorage.getItem("user"));

  const predefinedRoles = [
    "UI/UX",
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer"
  ]; // Predefined roles

  useEffect(() => {
    if (teamId) {
      // Fetch team details based on teamId from URL
      const fetchTeamData = async () => {
        setLoading(true);
        try {
          const teamdata = await findTeam(teamId);
          setTeam(teamdata.data.data); // Set team details
          const memberResponse = await getMember(teamId);
          setMembers(memberResponse.data.data);
          const userList = await getUsers();
          setListOfUsers(userList.data.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching team data:", error);
          setLoading(false);
        }
      };
      fetchTeamData();
    } else {
      setNoTeamSelected(true);
      setLoading(false);
    }
  }, [teamId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle adding a member (send userId, teamId, and selected role)
const handleAddMember = async (userId, teamId, role) => {
  console.log("Adding member with User ID:", userId, "Role:", role);
  
  try {
    // Call the addMember function (API call) to add the member
    const addingMember = await addMember(userId, teamId, role);

    // Check the HTTP status code from the response
    const status = addingMember.status;

    if (status === 201) {
      // If successful (201), update the members list by adding the new member
      if (addingMember.data && addingMember.data.teamMember) {
        setMembers((prevMembers) => [...prevMembers, addingMember.data.teamMember]);
        console.log("Member added successfully:", addingMember.data.teamMember);
      } else {
        console.error("Failed to add member: No member data returned");
      }
    } else if (status === 400) {
      // Handle 400 Bad Request
      console.error("Bad Request: Please provide all the required fields (userId, teamId, role).");
    } else if (status === 404) {
      // Handle 404 Not Found
      console.error("User not found.");
    } else if (status === 409) {
      // Handle 409 Conflict (User already in a team)
      console.error("Conflict: User is already a member of a team.");
    } else {
      // Handle other status codes or unexpected errors
      console.error("Unexpected error:", addingMember.data.message);
    }

    // Close the modal after adding or showing error
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error adding member:", error);
    // Optionally, display an error message to the user
    alert("user is Already in a Team.");
  }
};

const handleDeleteMember= async(userId)=>{
  try {
    await removeMember(userId)
  } catch (error) {
    
  }
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
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Manage Team</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Team Details</h3>
              <span className="text-xl font-semibold text-blue-600 p-2 block mb-2">
                Team Name: {team.name}
              </span>
              <span className="text-xl font-semibold text-blue-600 p-2 block mb-2">
                Created By: {user.name}
              </span>
              <span className="text-xl font-semibold text-blue-600 p-2 block mb-2">
                Team ID: {team.id}
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Team Members</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {members.map((member) => (
                  <div key={member.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col space-y-4">
                    <span className="text-xl font-semibold text-gray-800">Member Id: {member.member.id}</span>
                    <span className="text-lg text-blue-600">Name: {member.member.name}</span>
                    <span className="text-lg text-blue-600">Email: {member.member.email}</span>
                    <span className="text-lg text-blue-600">Phone: {member.member.phone}</span>
                    <span className="text-lg text-blue-600">Role: {member.role}</span>
                    <div className="mt-auto">
                      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 w-full" onClick={()=>handleDeleteMember(member.member.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                Add New Member
              </button>
            </div>

            {/* Modal for adding new member */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-8 w-1/3">
                  <h1 className="text-2xl font-semibold text-white-700 mb-4 text-center bg-blue-600 border ">Add New Member</h1>
                  <ul className="space-y-4">
                    {listOfUsers.map((user) => (
                      <li key={user.id} className="flex justify-between items-center">
                        <span>Id: {user.id}</span>
                        <span>Name: {user.name}</span>
                        <div>
                          <select
                            className="border p-2 rounded-md"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                          >
                            <option value="">Select Role</option>
                            {predefinedRoles.map((role, index) => (
                              <option key={index} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-300"
                          onClick={() => handleAddMember(user.id, team.id, selectedRole)}
                        >
                          Add
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex justify-end">
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageTeamPage;
