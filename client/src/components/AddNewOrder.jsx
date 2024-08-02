import React, { useState } from "react";
import { DialogTitle } from "@headlessui/react";
import ModalWrapper from "../components/modals/ModalWrapper";
import { Toaster, toast } from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ORDER } from "../mutations/orderMutations";
import { GET_ORDERS } from "../queries/orderQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddNewOrder = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("PREPARED");

  const [addOrder] = useMutation(ADD_ORDER, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addOrder } }) {
      const { orders } = cache.readQuery({ query: GET_ORDERS });
      cache.writeQuery({
        query: GET_ORDERS,
        data: {
          orders: [...orders, addOrder],
        },
      });
    },
  });

  const { loading: clientsLoading, error: clientsError, data: clientsData } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "" || clientId === "") {
      return alert("Please fill in all fields");
    }
    addOrder({
      variables: {
        name,
        description,
        clientId,
        status,
      },
    });
    setName("");
    setDescription("");
    setStatus("PREPARED");
    setClientId("");
    toast.success("Add New Order Complete!");
    window.location.reload();
  };

  
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={onSubmit}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Add New Order
          </DialogTitle>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
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
            <div className="col-span-full">
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
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Client Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    id="clientId"
                    value={clientId}
                    type="text"
                    onChange={(e) => setClientId(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    {clientsData &&
                      clientsData.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-span-full">
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
            <div className="col-span-full">
              <button
                type="submit"
                className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddNewOrder;
