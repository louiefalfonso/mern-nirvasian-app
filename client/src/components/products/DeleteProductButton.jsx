import React from 'react'
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { GET_PRODUCTS } from "../../queries/productQueries";
import { DELETE_PRODUCT } from "../../mutations/productMutations";

const DeleteProductButton = ({projectId}) => {
    const navigate = useNavigate();

    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
      variables: { id: projectId },
      onCompleted: () => navigate("/products"),
      refetchQueries: [{ query: GET_PRODUCTS }],
    });

  if (!projectId) return null;

  return (
    <React.Fragment>
      <Button
        label="Delete"
        onClick={deleteProduct}
        className="flex flex-row-reverse gap-1 items-center bg-red-500 text-white rounded-md 2xl:py-2.5"
      />
    </React.Fragment>
  );
}

export default DeleteProductButton