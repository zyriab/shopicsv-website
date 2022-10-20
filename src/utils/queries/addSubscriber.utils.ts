import { GraphQLClient } from 'graphql-request';
import checkFetch from '../tools/checkFetch.utils';
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

    checkFetch(res);

    const resData = await res.json();
    const typename = resData.data.addSubscriber.__typename;

    if (typename === 'Subscriber') {
      return resData.data.addSubscriber as Subscriber | undefined;
    }

    throw new Error(resData.data.addSubscriber.message);
  } catch (e) {
    throw e;
  }
}
