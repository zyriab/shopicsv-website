import { SubscriberInput } from '../../../definitions/graphql';
import { graphql } from 'gatsby';

const query = {
  query: graphql`
      mutation AddSubscriber(
        $email: String!
        $occupation: OccupationInput!
        $products: [ProductInput!]!
        $language: String!
      ) {
        addSubscriber(
          subscribersInput: {
            email: $email
            occupation: $occupation
            products: $products
            language: $language
          }
        ) {
          __typename
          ... on Subscriber {
            email
            occupation
            products
            language
          }
        }
      }
      ... on ServerError {
        message
      }
      ... on Unauthenticated {
        message
      }
    `,
  variables: <SubscriberInput>{
    email: '',
    occupation: {
      name: '',
      displayName: undefined,
    },
    products: [
      {
        name: '',
        category: '',
        displayName: undefined,
      },
    ],
    language: '',
  },
};

export { query };
