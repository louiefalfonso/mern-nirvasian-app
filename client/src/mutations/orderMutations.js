import { gql } from "@apollo/client";

const ADD_ORDER = gql`
  mutation addOrder(
    $name: String!
    $description: String!
    $status: OrderStatus!
    $clientId: ID!
  ) {
    addOrder(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      status
      client {
        __typename
        id
        name
        email
        phone
        role
        status
      }
    }
  }
`;

const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation updateOrder(
    $id: ID!
    $name: String!
    $description: String!
    $status: OrderStatus!
  ) {
    updateOrder(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
      client {
        __typename
        id
        name
        email
        phone
        role
        status
      }
    }
  }
`;

export { ADD_ORDER, DELETE_ORDER, UPDATE_ORDER };
