import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

const ClientRow = ({ client }) => {

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
    },
    
  });
  return (
    <>
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
            <p className="text-base text-black">
              <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                <FaTrash />
              </button>
            </p>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ClientRow;
