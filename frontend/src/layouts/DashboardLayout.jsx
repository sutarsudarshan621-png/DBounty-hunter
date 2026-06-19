import Navbar from "../components/layout/Navbar";


const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen p-0">
      <Navbar />



        <main className="flex-1 p-0">
          {children}
        </main>
      </div>
    
  );
};

export default DashboardLayout;