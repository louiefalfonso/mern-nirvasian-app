import React, { useState } from 'react'
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import Title from './common/Title';

const ClientTables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  const clients = data.clients;
  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = clients.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {!loading && !error && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <Title title="Client Lists" />
          </div>
          <table className="w-full mb-5">
            <thead className="border-b border-gray-300 ">
              <tr className="text-black text-left">
                <th className="py-2">Full Name</th>
                <th className="py-2">Email Address</th>
                <th className="py-2">Role</th>
                <th className="py-2">Activity</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10"
                >
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
                      <p className="text-base text-black">{client.role}</p>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <p className="text-base text-black">{client.status}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="flex justify-center mt-5">
            <ul className="flex">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className="mx-1">
                  <button
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-orange-500 text-white"
                        : "bg-gray-300"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default ClientTables