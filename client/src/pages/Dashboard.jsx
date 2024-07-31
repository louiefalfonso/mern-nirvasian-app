import React from "react";
import Clients from "../components/Clients";
//import Projects from "../components/Projects";
import AddClientModal from "../components/AddClientModal";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex gap-3 mb-4">
          <AddClientModal />
        </div>
        <Clients />
      </div>
    </>
  );
};

export default Dashboard;
