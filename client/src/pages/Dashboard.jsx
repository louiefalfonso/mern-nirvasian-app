import React from "react";
import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Header from "../components/Header";


const Dashboard = () => {
  return (
    <>
      <div className="h-full py-4">
        <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
          <Clients />
        </div>

        {/*<Projects />*/}
      </div>
    </>
  );
};

export default Dashboard;
