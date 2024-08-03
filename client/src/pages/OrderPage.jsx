import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import AddNewOrder from "../components/AddNewOrder";
import Orders from "../components/Orders";

const OrderPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between mb-4 w-full bg-white p-4 rounded shadow-sm">
        <Title title="Order Lists" />
        {
          <Button
            label="Add New Order"
            onClick={() => setOpen(true)}
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-orange-500 text-white rounded-md 2xl:py-2.5"
          />
        }
      </div>
      <div className="flex items-center justify-between mb-8 w-full bg-white p-4 rounded shadow-sm">
        <div className="w-full md:px-1 px-0 mb-6">
          <div className="overflow-x-auto">
            <Orders/>
          </div>
        </div>
      </div>
      <AddNewOrder open={open} setOpen={setOpen} />
    </>
  );
};

export default OrderPage;
