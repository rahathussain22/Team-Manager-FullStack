import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar";

import { findTeam } from "../services/teamService";
import { addMember, getMember, removeMember } from "../services/manageTeam";
import { getUsers } from "../services/userService";
import { assignTask, getAllTasks } from "../services/taskService";
import toast from "react-hot-toast";

const ManageTeamPage = () => {
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { teamId } = useParams();
  const [team, setTeam] = useState({});
  const [members, setMembers] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noTeamSelected, setNoTeamSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [showAssignModal, setShowAssignModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const predefinedRoles = [
    "UI/UX",
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer"
  ];

  useEffect(() => {
    if (teamId) {
      const fetchTeamData = async () => {
        setLoading(true);
        try {
          const teamdata = await findTeam(teamId);
          setTeam(teamdata.data.data);
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
      getTasks();
    } else {
      setNoTeamSelected(true);
      setLoading(false);
    }
  }, [teamId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddMember = async (userId, teamId, role) => {
    console.log("Adding member with User ID:", userId, "Role:", role);

    try {
      const addingMember = await addMember(userId, teamId, role);
      const status = addingMember.status;

      if (status === 201) {
        const memberResponse = await getMember(teamId);
        setMembers(memberResponse.data.data);
        console.log("Member added successfully:", addingMember.data.teamMember);
      } else if (status === 400) {
        console.error("Bad Request: Please provide all the required fields (userId, teamId, role).");
      } else if (status === 404) {
        console.error("User not found.");
      } else if (status === 409) {
        console.error("Conflict: User is already a member of a team.");
      } else {
        console.error("Unexpected error:", addingMember.data.message);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Error adding Member in a Team.");
    }
  };

  async function getTasks() {
    try {
      const response = await getAllTasks();
      setTasks(response.data.data);
      console.log("Response for Tasks: ", response.data.data);
    } catch (error) {
      if (error.status === 404) {
        alert("No Tasks Created by this user");
      }
    }
  }

  async function handleAssignTask(taskID, teamId) {
    try {
      const response = await assignTask(taskID, teamId);
      alert(`Task ID ${taskID} assigned to Team ID ${teamId}`);

    } catch (error) {
      console.log("Error", error)
    }

  }

  const handleDeleteMember = async (userId) => {
    try {
      const response = await removeMember(userId);

      if (response.status === 200) {
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.member.id !== userId)
        );
        console.log("Member deleted successfully");
      } else {
        console.error("Failed to delete member:", response.status);
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member. Please try again.");
    }
  };

  // ✅ Filter tasks assigned to this team
  const assignedTasks = tasks.filter(task => task.assignedTo === Number(teamId));

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

            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-700">Team Details</h3>
                <div className="flex space-x-4">
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Add New Member
                  </button>
                  <button
                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
                    onClick={() => setShowAssignModal(true)}
                  >
                    Assign Task
                  </button>
                </div>
              </div>

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

            {/* ✅ Team Members */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Team Members</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMemberId(member.member.id)}
                    className={`bg-white rounded-lg shadow-lg p-6 flex flex-col space-y-4 cursor-pointer transition-all duration-200 ${selectedMemberId === member.member.id ? "border-2 border-blue-500 scale-105" : ""
                      }`}
                  >
                    <span className="text-xl font-semibold text-gray-800">Member Id: {member.member.id}</span>
                    <span className="text-lg text-blue-600">Name: {member.member.name}</span>
                    <span className="text-lg text-blue-600">Email: {member.member.email}</span>
                    <span className="text-lg text-blue-600">Phone: {member.member.phone}</span>
                    <span className="text-lg text-blue-600">Role: {member.role}</span>
                    <div className="mt-auto">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 w-full"
                        onClick={() => handleDeleteMember(member.member.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Assigned Tasks List */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Assigned Tasks</h3>

              {assignedTasks.length === 0 ? (
                <p className="text-gray-500 text-center">No tasks assigned to this team.</p>
              ) : (
                <ul className="space-y-3 max-h-60 overflow-y-auto">
                  {assignedTasks.map((task) => (
                    <li
                      key={task.id}
                      className="border border-gray-300 rounded-md p-3 flex justify-between items-center hover:bg-gray-100 transition-all duration-200"
                    >
                      <div>
                        <p className="text-lg font-semibold text-blue-600">{task.name}</p>
                        <p className="text-sm text-gray-500">
                          Deadline: {new Date(task.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                        Assigned
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Modal for adding new member */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-8 w-1/3">
                  <h1 className="text-2xl font-semibold text-white-700 mb-4 text-center bg-blue-600 border ">
                    Add New Member
                  </h1>
                  <ul className="space-y-4">
                    {listOfUsers.map((user) => (
                      <li key={user.id} className="flex justify-between items-center">
                        <span>Id: {user.id}</span>
                        <span>Name: {user.name}</span>
                        <div>
                          <select
                            className="border p-2 rounded-md"
                            value={selectedRoles[user.id] || ""} // ✅ Each user has its own role
                            onChange={(e) =>
                              setSelectedRoles((prev) => ({
                                ...prev,
                                [user.id]: e.target.value,
                              }))
                            }
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
                          onClick={() => handleAddMember(user.id, team.id, selectedRoles[user.id])} // ✅ Use the user's specific role
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

            {/* ✅ Assign Task Modal */}
            {showAssignModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                    Assign Task to Team
                  </h2>

                  {tasks.length === 0 ? (
                    <p className="text-gray-500 text-center">No tasks available.</p>
                  ) : (
                    <ul className="space-y-3 max-h-60 overflow-y-auto">
                      {tasks.map((task) => (
                        <li
                          key={task.id}
                          onClick={() => {
                            handleAssignTask(task.id, team.id);
                            setShowAssignModal(false);
                          }}
                          className="border border-gray-300 rounded-md p-3 hover:bg-yellow-100 cursor-pointer flex justify-between items-center"
                        >
                          <span className="text-gray-800 font-medium">Task Id: {task.id}</span>
                          <span className="text-gray-800 font-medium">Name: {task.name}</span>
                          <span className="text-sm text-gray-500">
                            Deadline: {new Date(task.deadline).toLocaleDateString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 text-right">
                    <button
                      onClick={() => setShowAssignModal(false)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Cancel
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
