import React from 'react'
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../../queries/orderQueries";
import Spinner from "../Spinner";
import {
  CartesianGrid,
  ResponsiveContainer,
  Bar,
  BarChart,
  Legend,
  Tooltip,
} from "recharts";


const OrderChart = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  const filteredOrders = data.orders.filter((order) => {
    const statuses = ["Prepared", "Consigned", "Dispatched", "Shipped"];
    return statuses.includes(order.status);
  });

  // Calculate the counts for each status
  const counts = filteredOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const colors = ["#f97316", "#36a2eb", "#ffce56", "#4bc0c0"];
  const statusColors = {
    Prepared: "#f97316",
    Consigned: "#36a2eb",
    Dispatched: "#ffce56",
    Shipped: "#4bc0c0",
  }; 

  return (
    <>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart
          width={150}
          height={40}
          data={Object.entries(counts).map(([status, count]) => ({
            name: status,
            Status: count,
            fill: statusColors[status],
          }))}
        >
          <Tooltip
            formatter={(value, name, props) => {
              const status = props.payload.name;
              return `${status} with ${value} Orders`;
            }}
          />
          <Legend
            payload={Object.keys(counts).map((status) => ({
              value: status,
              type: "line",
              color: statusColors[status],
            }))}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Status" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default OrderChart