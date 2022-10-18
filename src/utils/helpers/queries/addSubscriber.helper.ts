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
        subscriberInput: {
          email: $email
          occupation: $occupation
          products: $products
          language: $language
        }
      ) {
        __typename
        ... on Subscriber {
          email
          occupation {
            name
            displayName
          }
          products {
            name
            category
          }
          language
        }
        ... on WrongEmailFormat {
          message
        }
        ... on Unauthenticated {
          message
        }
        ... on ServerError {
          message
        }
      }
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
