import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import ClientRow from "./ClientRow";

const Clients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="w-full md:w-3/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
          <table className="w-full">
            <thead className="border-b border-gray-300 ">
              <tr className="text-black text-left">
                <th className="py-2">Name</th>
                <th className="py-2">Email Address</th>
                <th className="py-2">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client, index) => (
                <ClientRow key={index} client={client} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Clients;
