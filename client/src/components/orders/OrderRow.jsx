import React from 'react'
import { TbListDetails } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useMutation, useQuery} from "@apollo/client";
import { DELETE_ORDER } from '../../mutations/orderMutations'
import { GET_ORDERS,GET_ORDER } from '../../queries/orderQueries'
import { MdCheckCircleOutline, MdPersonSearch } from "react-icons/md";


import { useNavigate } from "react-router-dom";

const OrderRow = ({order}) => {
    const [deleteOrder] = useMutation(DELETE_ORDER, {
        variables: { id: order.id },
        refetchQueries: [{ query: GET_ORDERS }],
        update(cache, { data: { deleteOrder } }) {
            const { orders } = cache.readQuery({ query: GET_ORDERS });
            cache.writeQuery({
                query: GET_ORDERS,
                data: {
                    orders: orders.filter((order) => order.id !== deleteOrder.id),
                },
            });
            toast.success("Delete Order Complete!");
        },
    });

    const { data, error, loading } = useQuery(GET_ORDER, {
      variables: { id: order.id },
      skip: true, 
    });
    
    const navigate = useNavigate();
    const viewOrder = () => {
      navigate(`/orders/${order.id}`);
    };

  return (
    <React.Fragment>
      <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
        <td className="py-2">
          <div className="flex items-center gap-2">
            <MdCheckCircleOutline className="text-amber-600" />
            <p className="text-base text-black">{order.id}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{order.name}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <MdPersonSearch className="text-amber-600" />
            <p className="text-base text-black">{order.client?.name}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{order.status}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-3">
            <p className="text-base text-black">
              <button
                className="text-slate-950 hover:text-slate-950"
                onClick={viewOrder}
              >
                <TbListDetails />
              </button>
            </p>
            <p className="text-base text-black">
              <button
                className="text-red-700 hover:text-red-500"
                onClick={deleteOrder}
              >
                <HiOutlineTrash />
              </button>
            </p>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default OrderRow