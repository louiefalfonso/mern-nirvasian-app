import React from "react";
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
          <table className="w-full mb-5">
            <thead className="border-b border-gray-300 ">
              <tr className="text-black text-left">
                <th className="py-2">Full Name</th>
                <th className="py-2">Email Address</th>
                <th className="py-2">Phone Number</th>
                <th className="py-2">Role</th>
                <th className="py-2">Activity</th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client, index) => (
                <ClientRow key={index} client={client} />
              ))}
            </tbody>
          </table>
      )}
    </>
  );
};

export default Clients;
