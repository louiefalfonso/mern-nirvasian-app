import React, { useState } from "react";

import { IoMdAdd } from "react-icons/io";

import Title from '../components/common/Title';
import Button from '../components/common/Button';
import Clients from '../components/Clients';
import AddNewClient from '../components/AddNewClient';

import AddClientModal from "../components/AddClientModal";

const ClientPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Client Lists" />
          {<Button
            label="Add New Client"
            onClick={() => setOpen(true)}
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-orange-500 text-white rounded-md 2xl:py-2.5"
          />}
          
        </div>
        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <Clients />
          </div>
        </div>
      </div>
      <AddNewClient open={open} setOpen={setOpen} />
    </>
  );
}

export default ClientPage