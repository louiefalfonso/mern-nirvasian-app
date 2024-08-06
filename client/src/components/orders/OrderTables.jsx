import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../../queries/orderQueries";
import { GET_CLIENTS } from "../../queries/clientQueries";
import Spinner from "../Spinner";
import { MdCheckCircleOutline, MdPersonSearch } from "react-icons/md";
import Title from "../common/Title";


const OrderTables = () => {
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 5;
    
    const { loading: ordersLoading, error: ordersError, data: ordersData } = useQuery(GET_ORDERS);
    const { loading: clientsLoading, error: clientsError, data: clientsData } = useQuery(GET_CLIENTS);

    const { loading, error, data } = useQuery(GET_ORDERS);
    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

    const orders = ordersData.orders;
    const clients = clientsData.clients;
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentClients = orders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {!ordersLoading && !ordersError && !clientsLoading && !clientsError && (
        <>
          <table className="w-full mb-5">
            <thead className="border-b border-gray-300 ">
              <tr className="text-black text-left">
                <th className="py-2">Order Id</th>
                <th className="py-2">Order Name</th>
                <th className="py-2">Client</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10"
                >
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <MdCheckCircleOutline className="text-amber-600" />
                      <p className="text-base text-black"> {order.id}</p>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <p className="text-base text-black">{order.name}</p>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <p className="text-base text-black">
                        {order.client?.name}
                      </p>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <p className="text-base text-black">{order.status}</p>
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
        </>
      )}
    </>
  );
}

export default OrderTables