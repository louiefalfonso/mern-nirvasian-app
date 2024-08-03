import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../queries/orderQueries";
import Spinner from "./Spinner";
import OrderRow from "./OrderRow";
import { Toaster } from "react-hot-toast";

const Orders = () => {
    const { loading, error, data } = useQuery(GET_ORDERS);
    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
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
              {data.orders.map((order, index) => (
                <OrderRow key={index} order={order} />
              ))}
            </tbody>
          </table>
        </>
      )}
      <Toaster />
    </>
  );
};

export default Orders;
