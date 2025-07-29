import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "./mainlayout"; // Import the MainLayout component
import { getTeam } from "../services/teamService";
import { getTask } from "../services/taskService";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([])
  const [loading, setLoading] = useState(true); // Loading state
  const [showTasks, setShowTasks] = useState(false); // State to toggle task list visibility
  const [showTeams, setShowTeams] = useState(false); // State to toggle team list visibility
  const [showProjects, setShowProjects] = useState(false); // State to toggle projects list visibility
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

  useEffect(() => {
    // Fetch data for tasks, teams, and active projects
    const fetchUserData = async () => {
      if (user) {
        try {
          // Assuming your API is set up to return data for tasks, teams, and active projects
          const tasksResponse = await getTask();
          console.info("Task Response: ", tasksResponse.data)
          const teamsResponse = await getTeam();
          const tasks = tasksResponse.data.data;
          const activeTasks = tasks.filter((task) => {
            return task.iscompleted === false; // Ensure proper boolean comparison
          });

          const completedTasks = tasks.filter((task) => {
            return task.iscompleted === true; // Ensure proper boolean comparison
          });
          console.log("After filter, Active Tasks: ", activeTasks)
          setTasks(tasksResponse.data.data || []);
          setTeams(teamsResponse.data.data || []);

          setActiveProjects(activeTasks || [])
          setCompletedProjects(completedTasks || [])
        } catch (error) {
          console.log("error", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Function to toggle task visibility
  const toggleTasks = () => setShowTasks(!showTasks);
  // Function to toggle teams visibility
  const toggleTeams = () => setShowTeams(!showTeams);
  // Function to toggle projects visibility
  const toggleProjects = () => setShowProjects(!showProjects);
  const toggleCompletedProjects = () => setCompletedProjects(!completedProjects);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading message while fetching data
  }

  return (
    <MainLayout>
      {/* Dashboard Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Welcome , {user ? user.name : "User"}!
        </h2>
        <p className="text-lg text-gray-600">
          You have successfully logged in. Here is an overview of your dashboard.
        </p>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Tasks */}
        <div
          onClick={toggleTasks} // Toggle task list visibility on click
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold text-gray-800">{tasks.length}</p>
        </div>

        {/* Card 2: Teams */}
        <div
          onClick={toggleTeams} // Toggle team list visibility on click
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Teams</h3>
          <p className="text-3xl font-bold text-gray-800">{teams.length}</p>
        </div>

        {/* Card 3: Active Projects */}
        <div
          onClick={toggleProjects} // Toggle projects list visibility on click
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-gray-800">{activeProjects.length}</p>
        </div>
      </div>

      {/* Task List */}
      {showTasks && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Tasks</h3>
          <ul className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li key={task.id} className="text-gray-600">{task.name}</li>
              ))
            ) : (
              <li className="text-gray-600">No tasks found.</li>
            )}
          </ul>
        </div>
      )}

      {/* Teams List */}
      {showTeams && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Teams</h3>
          <ul className="space-y-4">
            {teams.length > 0 ? (
              teams.map((team) => (
                <li key={team.id} className="text-gray-600">{team.name}</li>
              ))
            ) : (
              <li className="text-gray-600">No teams found.</li>
            )}
          </ul>
        </div>
      )}

      {/* Active Projects List */}
      {showProjects && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Active Projects</h3>
          <ul className="space-y-4">
            {activeProjects.length > 0 ? (
              activeProjects.map((project) => (
                <li key={project.id} className="text-gray-600">{project.name}</li>
              ))
            ) : (
              <li className="text-gray-600">No active projects found.</li>
            )}
          </ul>
        </div>
      )}
      {/* completed Projects List */}
      {completedProjects && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Completed Projects</h3>
          <ul className="space-y-4">
            {completedProjects.length > 0 ? (
              completedProjects.map((project) => (
                <li key={project.id} className="text-gray-600">{project.name}</li>
              ))
            ) : (
              <li className="text-gray-600">No Completed projects found.</li>
            )}
          </ul>
        </div>
      )}
    </MainLayout>
  );
};

export default HomePage;
