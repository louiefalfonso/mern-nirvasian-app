import { DialogTitle } from '@headlessui/react';
import React, { useState } from 'react';
import ModalWrapper from '../modals/ModalWrapper';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../../mutations/productMutations';
import { GET_PRODUCTS } from '../../queries/productQueries';
import Spinner from '../Spinner';

const AddNewProduct = ({ open, setOpen }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState("INSTOCK");
  const [type, setType] = useState("RAW");

  const [addProduct] = useMutation(ADD_PRODUCT, {
    variables: { name, description, sku, amount, quantity, status, type },
    update(cache, { data: { addProduct } }) {
      const { products } = cache.readQuery({ query: GET_PRODUCTS });
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          products: [...products, addProduct],
        },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      description === "" ||
      status === "" ||
      sku === "" ||
      amount === "" ||
      quantity === "" ||
      type === ""
    ) {
      return toast.error("Please fill in all fields");
    }
    addProduct({
      variables: {
        name,
        description,
        sku,
        amount,
        quantity,
        status,
        type,
      },
    })
      .then((result) => {
        // Reset form fields
        setName("");
        setDescription("");
        setSku("");
        setAmount("");
        setQuantity("");
        setStatus("INSTOCK");
        setType("RAW");
        toast.success("Add New Product Complete!");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Error adding new product: " + error.message);
      });
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={onSubmit}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Add New Product
          </DialogTitle>
          <div className="flex items-center justify-between w-full ">
            <div className="w-1/2 p-2">
              <div className="col-span-full m-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Product Name:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      placeholder="Product Name"
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full m-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Amount:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="amount"
                      type="text"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full m-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Product Status:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select
                      id="status"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    >
                      <option value="INSTOCK">In Stock</option>
                      <option value="NOSTOCK">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="col-span-full m-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  SKU:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="sku"
                      type="text"
                      placeholder="SKU"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full m-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Quantity:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="quantity"
                      type="text"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full m-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Product Type:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select
                      id="type"
                      name="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    >
                      <option value="RAW">Raw Materials</option>
                      <option value="FINISHED">Finished Goods</option>
                      <option value="PERISHABLE">Perishable Goods</option>
                      <option value="HAZARDOUS">Hazardous Materials</option>
                      <option value="HIGHVALUE">High-Value Goods</option>
                      <option value="OTHERS">Others</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-2">
            <div className="col-span-full mb-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Product Description:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <textarea
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    id="description"
                    placeholder="Description"
                    value={description}
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-span-full mt-4">
              <button
                type="submit"
                className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orang-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
              >
                Save New Product
              </button>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
}

export default AddNewProduct