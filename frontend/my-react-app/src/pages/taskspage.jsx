import React from "react";

const TasksPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Tasks</h2>
        <p className="text-lg text-gray-600">
          This is the Tasks page. Here you can manage your tasks.
        </p>
      </div>
    </div>
  );
};

export default TasksPage;
