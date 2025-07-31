import React, { useState, useEffect } from "react";
import { createTask, deleteTask, getAllTasks } from "../services/taskService";
import toast from "react-hot-toast";
import Sidebar from "./sidebar";

const TasksPage = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [taskData, setTaskData]=useState({})  // stores the data of particular task
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [teams, setTeams] = useState([]); 
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
useEffect(() => {
    setLoading(true);
    getTasks()
    setLoading(false)
  }, []);

  const handleDeleteTask = async (taskId) => {

    try {

      // Call the deleteTask API (already imported)
      const response = await deleteTask(taskId);

      
      toast.success(response.data.message || "Task deleted successfully");

      // Remove the deleted task from UI
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      // Log the error for debugging
      console.error("Delete Task Error:", error);

      // Show error message
      toast.error(error?.response?.data?.message || "Failed to delete task");
    }
  };


  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const task = await createTask(name, deadline);
      toast.success("Task Created.");
      setShowCreateModal(false);
      setName("");
      setDeadline("");
    } catch (error) {
      console.error("Error Creating Task: ", error);
      toast.error("Failed to create task");
    }
  };

  async function getTasks() {
    try {
      const response = await getAllTasks()

      setTasks(response.data.data)
      console.log("Response for Tasks: ", response.data.data)
    } catch (error) {
      if (error.status == 404) {
        toast.error("No Tasks Created by this user")
      }
    }

  }

  const formatDate = (date) => {
    const dateObj = new Date(date);

    const day = dateObj.getUTCDate();

    const month = dateObj.toLocaleDateString('en-US', { month: 'long' });

    return `${day}-${month}`
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-grow p-8">
        <div className="bg-white p-8 rounded-xl shadow-xl">

          {/* ✅ Header Section */}
          <section className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">Task Dashboard</h1>
            <p className="text-gray-600 text-md">
              Manage your tasks effectively. You can create, update, assign, and delete tasks using the controls below.
            </p>
          </section>

          {/* ✅ Button Actions Section */}
          <section className="mb-8">
            <div className="flex justify-center flex-wrap gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-all duration-300"
              >
                Create Task
              </button>
             
            </div>
          </section>


          {/* ✅ Create Task Form Section */}
          {showCreateModal && (
            <section className="mb-8 border border-gray-200 rounded-lg p-6 shadow">
              <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Create New Task</h2>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Task Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Task Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-300"
                  >
                    Create Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* ✅ Task Cards Section */}
         <section>
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tasks</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {tasks.length === 0 ? (
      <p className="text-gray-500">No tasks available yet.</p>
    ) : (
      tasks.map((task) => (
        <div
          key={task.id}
          onClick={() => setTaskData(task)}
          className={`bg-white p-6 rounded-lg shadow-lg border cursor-pointer transition-all duration-200 ${
            taskData?.id === task.id ? "border-2 border-blue-500 scale-105" : "border-gray-200"
          }`}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{task.name}</h3>
          <p className="text-gray-600">Created By: {task.createdBy}</p>
          <p className="text-gray-600">Deadline: {formatDate(task.deadline)}</p>
          <p className="text-gray-600">{task.isCompleted ? "Completed" : "Pending"}</p>

          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => toast.success("Task Updated")}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-all duration-300"
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-all duration-300"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setTaskData(task);
                setShowAssignModal(true);
              }}
              className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition-all duration-300"
            >
              Assign
            </button>
          </div>
        </div>
      ))
    )}
  </div>

  {/* ✅ Assign Modal */}
  {showAssignModal && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Assign Task to a Team
        </h2>
        <ul className="space-y-3 max-h-60 overflow-y-auto">
          {teams.map((team) => (
            <li
              key={team.id}
              onClick={() => handleAssignToTeam(team.id)}
              className="border border-gray-300 rounded-md p-3 hover:bg-blue-100 cursor-pointer flex justify-between items-center"
            >
              <span className="text-gray-800 font-medium">Team: {team.name}</span>
              <span className="text-sm text-gray-500">ID: {team.id}</span>
            </li>
          ))}
        </ul>
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
</section>

          
        </div>
      </div>
    </div>
  );
};

export default TasksPage;

