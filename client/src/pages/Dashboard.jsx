import React from "react";
import ClientTables from "../components/client/ClientTables";
import OrderTables from "../components/orders/OrderTables";
import Title from "../components/common/Title";
import OrderChart from "../components/orders/OrderChart";

const Dashboard = () => {
 
  return (
    <>
      <div className="h-full">
        <div className="w-full bg-white p-4 rounded shadow-sm">
          <Title title="Orders" />
          <OrderChart />
        </div>
        <div className="w-full bg-white my-4 p-4 rounded shadow-sm">
          <div className="overflow-x-auto">
            <OrderTables />
          </div>
        </div>
        <div className="w-full bg-white my-4 p-4 rounded shadow-sm">
          <div className="overflow-x-auto">
            <ClientTables />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
