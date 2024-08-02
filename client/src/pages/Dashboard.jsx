import React from "react";
import ClientTables from "../components/ClientTables";

const Dashboard = () => {
  return (
    <>
      <div className="h-full">
        <div className="w-full bg-white p-4 rounded shadow-sm">
          <ClientTables/>
        </div>
        <div className="w-full bg-white my-4 p-4 rounded shadow-sm">
          Orders
        </div>
        <div className="w-full bg-white my-4 p-4 rounded shadow-sm">
          Products
        </div>
      </div>
    </>
  );
};

export default Dashboard;
