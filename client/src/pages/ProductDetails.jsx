import React from 'react'

import Title from "../components/common/Title";
import Spinner from "../components/Spinner";
import Button from "../components/common/Button";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";  
import { GET_PRODUCT } from "../queries/productQueries";
import { DELETE_PRODUCT } from "../mutations/productMutations";
import EditProductForm from "../components/products/EditProductForm";
import { useNavigate } from "react-router-dom";
import DeleteProductButton from '../components/products/DeleteProductButton';

const ProductDetails = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });

    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        variables: { id },
        refetchQueries: [{ query: GET_PRODUCT }],
        update(cache, { data: { deleteProduct } }) {
            const { products } = cache.readQuery({ query: GET_PRODUCT });
            cache.writeQuery({
                query: GET_PRODUCT,
                data: {
                    products: products.filter((product) => product.id !== deleteProduct.id),
                },
            });
        },
    });

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

    const { product } = data;

  return (
    <>
      <div className="flex items-center justify-between mb-4 w-full bg-white p-4 rounded shadow-sm">
        <Title title={`Product Details: ${product?.id}`} />
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
              <th className="py-2 w-1/4">Product Name:</th>
              <th className="py-2 w-1/4">SKU</th>
              <th className="py-2 w-1/4">Product Type</th>
              <th className="py-2 w-1/4">Availability</th>
            </tr>
          </thead>
          <tbody>
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
                  <p className="text-base text-black">{product.status}</p>
                </div>
              </td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <DeleteProductButton projectId={data.product.id} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mb-8 w-full bg-white p-4 rounded shadow-sm">
        <div className="w-1/2">
          <EditProductForm product={product} />
        </div>
        <div className="w-1/2">
          <div className="max-w-sm mx-auto bg-white rounded-lg border w-full ">
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900">
                Product ID: {product.id}
              </h2>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Price:</p>
              <p className="text-gray-900">£ {product.amount}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Quantity:</p>
              <p className="text-gray-900">{product.quantity} pieces</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Order Description:</p>
              <p className="text-gray-900">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails