import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_PRODUCT } from '../../queries/productQueries'
import { useNavigate } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";


const ProductRow = ({product}) => {

    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { id: product.id },
        skip: true,
    });
    const navigate = useNavigate();
    const viewOrder = () => {
      navigate(`/products/${product.id}`);
    };

  return (
    <React.Fragment>
      <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{product.name}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{product.sku}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{product.type}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{product.quantity}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">{product.status}</p>
          </div>
        </td>
        <td className="py-2">
          <div className="flex items-center gap-2">
            <p className="text-base text-black">
              <button
                className="text-slate-950 hover:text-slate-950"
                onClick={viewOrder}
              >
                <TbListDetails />
              </button>
            </p>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default ProductRow