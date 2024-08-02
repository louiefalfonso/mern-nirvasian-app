import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient(
    $name: String!
    $email: String!
    $phone: String!
    $role: String!
    $status: ClientActivity!
  ) {
    addClient(name: $name, email: $email, phone: $phone, role: $role, status: $status) {
      id
      name
      email
      phone
      role
      status
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation updateClient(
    $id: ID!
    $name: String!
    $email: String!
    $phone: String!
    $role: String!
    $status: ClientActivity!
  ) {
    updateClient(
      id: $id
      name: $name
      email: $email
      phone: $phone
      role: $role
      status: $status
    ) {
      id
      name
      email
      phone
      role
      status
    }
  }
`;


const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
      role
      status
    }
  }
`;

export { ADD_CLIENT, DELETE_CLIENT, UPDATE_CLIENT };
