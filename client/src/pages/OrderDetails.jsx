import React from "react";
import Title from "../components/common/Title";
import Spinner from "../components/Spinner";
import Button from "../components/common/Button";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ORDER } from "../queries/orderQueries";
import EditOrderForm from "../components/orders/EditOrderForm";

const OrderDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ORDER, { variables: { id } });
  

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  const { order } = data;

  return (
    <>
      <div className="flex items-center justify-between mb-4 w-full bg-white p-4 rounded shadow-sm">
        <Title title={`Order Details: ${order?.id}`} />
        {
          <Button
            label="Back"
            onClick={() => window.history.back()}
            className="flex flex-row-reverse gap-1 items-center bg-orange-500 text-white rounded-md 2xl:py-2.5"
          />
        }
      </div>
      <div className="flex items-center justify-between mb-8 w-full bg-white p-4 rounded shadow-sm">
        <table className="w-full mb-5">
          <thead className="border-b border-gray-300 ">
            <tr className="text-black text-left">
              <th className="py-2 w-1/4">Client Name</th>
              <th className="py-2 w-1/4">Email Address:</th>
              <th className="py-2 w-1/4">Contact Number:</th>
              <th className="py-2 w-1/4">Role:</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <p className="text-base text-black">{order?.client?.name}</p>
                </div>
              </td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <p className="text-base text-black">{order?.client?.email}</p>
                </div>
              </td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <p className="text-base text-black">{order?.client?.phone}</p>
                </div>
              </td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <p className="text-base text-black">{order?.client?.role}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mb-8 w-full bg-white p-4 rounded shadow-sm">
        <div className="w-1/2">
          <EditOrderForm order={data.order}/>
        </div>
        <div className="w-1/2">
          <div className="max-w-sm mx-auto bg-white rounded-lg border w-full ">
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900">Order ID: {order?.id}</h2>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Order Name:</p>
              <p className="text-gray-900">{order?.name}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Order Status:</p>
              <p className="text-gray-900">{order?.status}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Order Description:</p>
              <p className="text-gray-900">{order?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
