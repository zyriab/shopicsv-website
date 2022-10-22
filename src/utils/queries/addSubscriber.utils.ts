import { GraphQLClient } from 'graphql-request';
import { Subscriber, SubscriberInput } from '../../definitions/graphql';

export default async function addSubscriber(args: SubscriberInput) {
  try {
    const client = new GraphQLClient(process.env.GATSBY_NOUVELL_URL!, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await client.request(
      `mutation AddSubscriber(
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
      }`,
      args
    );

    const typename = res.addSubscriber.__typename;

    if (typename === 'Subscriber') {
      return res.addSubscriber as Subscriber | undefined;
    }

    throw new Error(res.addSubscriber.message);
  } catch (e) {
    throw e;
  }
}
