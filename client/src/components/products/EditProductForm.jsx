import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Toaster, toast } from "react-hot-toast";
import { GET_PRODUCT } from "../../queries/productQueries";
import { UPDATE_PRODUCT } from "../../mutations/productMutations";

const EditProductForm = ({product}) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [sku,setSku] = useState(product.sku);
    const [quantity, setQuantity] = useState(product.quantity);
    const [amount, setAmount] = useState(product.amount);
    const [status, setStatus] = useState(()=>{
        switch (product.status) {
          case "In Stock":
            return "INSTOCK";
          case "Out Of Stock":
            return "NOSTOCK";
          default:
            throw new Error(`Unknown status: ${product.status}`);
        }
    });
    const [type, setType] = useState(()=>{
        switch (product.type) {
          case "Raw Materials":
            return "RAW";
          case "Finished Goods":
            return "FINISHED";
          case "Perishable Goods":
            return "PERISHABLE";
          case "Hazardous Materials":
            return "HAZARDOUS";
          case "High-Value Goods":
            return "HIGHVALUE";
          case "Others":
            return "OTHERS";
          default:
            throw new Error(`Unknown type: ${product.type}`);
        }
    });

    const [updateProduct] = useMutation(UPDATE_PRODUCT, {
        variables: { id: product.id, name, description, sku, amount, quantity, status, type },
        refetchQueries: [{ query: GET_PRODUCT, variables:{ id: product.id} }],
      });
    
      const onSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !description || !sku || !amount || !quantity || !status || !type) {
          return alert("Please fill out all fields");
        }
    
       updateProduct(name, description, sku, amount, quantity, status, type);
       toast.success("Product Update Complete!");
      };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h2 className="text-base font-bold leading-6 text-gray-900 mb-4">
          Update Product Details:
        </h2>
        <div className="flex items-center justify-between w-full ">
          <div className="w-1/2 p-2">
            <div className="col-span-full m-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Product Name:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    placeholder="Product Name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full m-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Amount:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="amount"
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full m-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Product Status:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    <option value="INSTOCK">In Stock</option>
                    <option value="NOSTOCK">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 p-2">
            <div className="col-span-full m-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                SKU:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="sku"
                    type="text"
                    placeholder="SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full m-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Quantity:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="quantity"
                    type="text"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full m-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Product Type:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    <option value="RAW">Raw Materials</option>
                    <option value="FINISHED">Finished Goods</option>
                    <option value="PERISHABLE">Perishable Goods</option>
                    <option value="HAZARDOUS">Hazardous Materials</option>
                    <option value="HIGHVALUE">High-Value Goods</option>
                    <option value="OTHERS">Others</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-2">
          <div className="col-span-full mb-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Product Description:
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <textarea
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  id="description"
                  placeholder="Description"
                  value={description}
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-span-full mt-4">
            <button
              type="submit"
              className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orang-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
            >
              Update Product Details
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default EditProductForm;
