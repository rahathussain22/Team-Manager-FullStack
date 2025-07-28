import Sidebar from "./sidebar"; // Import the Sidebar component

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-3/4 p-8">
        {children} {/* Render the children content (page-specific content) */}
      </div>
    </div>
  );
};

export default MainLayout;
