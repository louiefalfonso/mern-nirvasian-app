
import React, { useState } from "react";
import { DialogTitle } from "@headlessui/react";
import ModalWrapper from "../modals/ModalWrapper";
import { useMutation } from "@apollo/client";
import { UPDATE_CLIENT} from "../../mutations/clientMutations";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { Toaster, toast } from "react-hot-toast";

const UpdateClientForm = ({ client, open, setOpen }) => {
  const [name, setName] = useState(client?.name);
  const [email, setEmail] = useState(client?.email);
  const [phone, setPhone] = useState(client?.phone);
  const [role, setRole] = useState(client?.role);
  const [status, setStatus] = useState(() => {
    if (!client) return "temp";
    switch (client?.status) {
      case "Temporary":
        return "TEMP";
      case "Active":
        return "ACTIVE";
      case "In Active":
        return "INACTIVE";
      default:
        throw new Error(`Unknown status: ${client?.status}`);
    }
  });

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: client ? { id: client.id, name, email, phone, role, status } : {},
    refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { updateClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.map((client) => {
            if (client.id === updateClient.id) {
              return updateClient;
            }
            return client;
          }),
        },
      });
    },
  });

  if (!client) return null;

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      role === "" ||
      status === ""
    ) {
      return alert("Please fill in all fields");
    }
    updateClient(name, email, phone, role, status);
    setName("");
    setEmail("");
    setPhone("");
    setRole("");
    setStatus("temp");
    toast.success("Update Client Complete!");
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
            Update Client Details
          </DialogTitle>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Full Name:
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
                Email Address:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Role:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Status:
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
                    <option value="TEMP">Temporary</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">In Active</option>
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

export default UpdateClientForm