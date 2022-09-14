import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { SUBGRAPH_ENDPOINT } from '../constants';

const httpUrl = SUBGRAPH_ENDPOINT;
const websockerUrl = httpUrl && httpUrl.replace('https', 'wss');

const httpLink = new HttpLink({
  uri: httpUrl,
});

const wsLink = new WebSocketLink(
  new SubscriptionClient(
    websockerUrl || '',
    {
      reconnect: true,
    },
    require('websocket').w3cwebsocket
  )
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
