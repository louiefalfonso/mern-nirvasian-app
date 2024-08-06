import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../queries/productQueries';
import Spinner from '../Spinner';
import { Toaster } from 'react-hot-toast';
import ProductRow from './ProductRow';

const Products = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <div className="flex items-center justify-between mb-8">
            <table className="w-full mb-5">
              <thead className="border-b border-gray-300 ">
                <tr className="text-black text-left">
                  <th className="py-2">Product Name</th>
                  <th className="py-2">SKU</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product, index) => (
                  <ProductRow key={index} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <Toaster />
    </>
  );
}

export default Products