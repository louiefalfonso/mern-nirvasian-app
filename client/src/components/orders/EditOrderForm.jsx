import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_ORDER } from "../../queries/orderQueries";
import { UPDATE_ORDER } from "../../mutations/orderMutations";
import { Toaster, toast } from "react-hot-toast";

const EditOrderForm = ({order}) => {
    const [name, setName] = useState(order.name);
    const [description, setDescription] = useState(order.description);
    const [status, setStatus] = useState(() => {
      switch (order.status) {
        case "Prepared":
          return "PREPARED";
        case "Consigned":
          return "CONSIGNED";
        case "Dispatched":
          return "DISPATCH";
        case "Shipped":
          return "SHIPPED";
        default:
          throw new Error(`Unknown status: ${order.status}`);
      }
    });
    const [updateOrder] = useMutation(UPDATE_ORDER, {
      variables: { id: order.id, name, description, status },
      refetchQueries: [{ query: GET_ORDER, variables:{ id: order.id} }],
    });

    const onSubmit = async (e) => {
      e.preventDefault();

      if (!name || !description || !status) {
        return alert("Please fill out all fields");
      }

     updateOrder(name, description, status);
     toast.success("Order Update Complete!");
    };

    

  return (
    <>
      <form onSubmit={onSubmit}
      >
        <h2 className="text-base font-bold leading-6 text-gray-900 mb-4">
          Update Order:
        </h2>
        <div className="col-span-full mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Order Name:
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="col-span-full mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Order Description:
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <textarea
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                id="description"
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="col-span-full mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Order Status:
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
                <option value="PREPARED">Prepared</option>
                <option value="CONSIGN">Consigned</option>
                <option value="DISPATCH">Dispatched</option>
                <option value="SHIPPED">Shipped</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-span-full mt-2">
          <button
            type="submit"
            className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <Toaster />
    </>
  );
}

export default EditOrderForm