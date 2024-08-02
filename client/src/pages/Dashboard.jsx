import React from "react";
import Clients from "../components/Clients";

const Dashboard = () => {
  return (
    <>
      <div className="h-full py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">Dashboard</div>
        <div className="w-full bg-white my-4 p-4 rounded shadow-sm">
          <Clients />
        </div>
        <div className="w-full bg-white my-4 p-4 rounded shadow-sm">
          Projects
        </div>
        

        {/*<Projects />*/}
      </div>
    </>
  );
};

export default Dashboard;
