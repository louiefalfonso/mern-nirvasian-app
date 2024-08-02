import { gql } from "@apollo/client";

const GET_ORDERS = gql`
  query getOrders {
    orders {
      id
      name
      status
    }
  }
`;

const GET_ORDER = gql`
  query getOrder($id: ID!) {
    order(id: $id) {
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

export { GET_ORDERS, GET_ORDER };
