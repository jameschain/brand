import { useQuery } from '@apollo/client';

import { myTickersQuery } from '../graphql';

export const useMyTickers = (address: string) => {
  const { data, error, loading } = useQuery(myTickersQuery, {
    variables: {
      creator: address.toLowerCase(),
    },
  });

  const { tickers } = data || [];

  return { error, loading, tickers };
};
