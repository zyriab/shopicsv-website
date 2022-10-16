import query from '../helpers/queries/addSubscriber.helper';
import checkFetch from '../tools/checkFetch.utils';
import { Subscriber, SubscriberInput } from '../../definitions/graphql';

export default async function addSubscriber(args: SubscriberInput) {
  try {
    const body = { ...query };
    query.variables = args;

    const res = await fetch(process.env.REACT_APP_NOUVELL_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

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
