import React from "react";
import ClientTables from "../components/ClientTables";
import OrderTables from "../components/OrderTables";
import Title from "../components/common/Title";

const Dashboard = () => {
  return (
    <>
      <div className="h-full">
        <div className="w-full bg-white p-4 rounded shadow-sm">
          <OrderTables />
        </div>
        <div className="w-full bg-white my-4 p-4 rounded shadow-sm">
          <ClientTables />
        </div>
        <div className="w-full bg-white my-4 p-4 rounded shadow-sm"></div>
      </div>
    </>
  );
};

export default Dashboard;
