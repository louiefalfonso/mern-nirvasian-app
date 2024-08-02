import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Title from '../components/common/Title';
import Button from '../components/common/Button';
import Clients from '../components/Clients';
import AddNewClient from '../components/AddNewClient';

const ClientPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between mb-4 w-full bg-white p-4 rounded shadow-sm">
        <Title title="Client Lists"/>
        {
          <Button
            label="Add New Client"
            onClick={() => setOpen(true)}
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-orange-500 text-white rounded-md 2xl:py-2.5"
          />
        }
      </div>
      <div className="flex items-center justify-between mb-8 w-full bg-white p-4 rounded shadow-sm">
        <Clients />
      </div>
      <AddNewClient open={open} setOpen={setOpen} />
    </>
  );
}

export default ClientPage