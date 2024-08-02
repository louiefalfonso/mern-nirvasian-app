import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { toast } from "react-hot-toast";
import UpdateClientForm from "./UpdateClientForm";
import Button from "./common/Button";

const ClientRow = ({ client }) => {
  const [open, setOpen] = useState(false);
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],

    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
      toast.success("Delete Client Complete!");
    },
  });
  
  return (
    <React.Fragment>
      <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{client.name}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{client.email}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{client.phone}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{client.role}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{client.status}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-3">
            <p className="text-base text-black">
              <Button
                onClick={() => setOpen(true)}
                icon={<FaEdit />}
                className="text-slate-950 hover:text-slate-950"
              />
            </p>
            <p className="text-base text-black">
              <button
                className="text-red-700 hover:text-red-500"
                onClick={deleteClient}
              >
                <FaTrashAlt />
              </button>
            </p>
          </div>
        </td>
      </tr>
      <UpdateClientForm client={client} open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

export default ClientRow;
