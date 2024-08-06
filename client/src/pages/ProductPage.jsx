import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import AddNewProduct from "../components/products/AddNewProduct";
import Products from "../components/products/Products";

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between mb-4 w-full bg-white p-4 rounded shadow-sm">
        <Title title="Product Lists" />
        {
          <Button
            label="Add New Product"
            onClick={() => setOpen(true)}
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-orange-500 text-white rounded-md 2xl:py-2.5"
          />
        }
      </div>
      <div className="flex items-center justify-between mb-8 w-full bg-white p-4 rounded shadow-sm">
        <div className="w-full md:px-1 px-0 mb-6">
          <div className="overflow-x-auto">
            <Products/>
          </div>
        </div>
      </div>
      <AddNewProduct open={open} setOpen={setOpen} />
    </>
  );
};

export default ProductPage;
