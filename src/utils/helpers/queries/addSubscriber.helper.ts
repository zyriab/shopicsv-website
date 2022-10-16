import { SubscriberInput } from '../../../definitions/graphql';
import { graphql } from 'gatsby';
import errorSpreads from '../gqlErrorSpreads.helper';

const query = {
  query:
    graphql`
      mutation AddSubscriber(
        $email: String!
        $occupation: String!
        $products: [String!]!
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
    ` + errorSpreads.toString(),
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
