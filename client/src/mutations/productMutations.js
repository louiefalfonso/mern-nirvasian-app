import { gql } from "@apollo/client";

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!,
    $description: String!,
    $sku: String!
    $amount: String!
    $quantity: String!
    $status: ProductStatus!
    $type: ProductType!
  ) {
    addProduct(
      name: $name,
      description: $description,
      type: $type
      status: $status
      sku: $sku
      amount: $amount
      quantity: $quantity
    ) {
      id
      name
      description
      type
      status
      sku
      amount
      quantity
    }
  }
`;
 const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String!
    $description: String!
    $sku: String!
    $amount: String!
    $quantity: String!
    $status: ProductStatus!
    $type: ProductType!
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      type: $type
      status: $status
      sku: $sku
      amount: $amount
      quantity: $quantity
    ) {
      id
      name
      description
      type
      status
      sku
      amount
      quantity
    }
  }
`;



export { DELETE_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT };