import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
    query getProducts {
        products {
            id
            name
            description
            status
            sku
            amount
            quantity
            type
        }
    }
`;

const GET_PRODUCT= gql`
    query getProduct($id: ID!) {
        product(id: $id) {
            id
            name
            description
            status
            sku
            amount
            quantity
            type
        }
    }
`;


export { GET_PRODUCTS, GET_PRODUCT }