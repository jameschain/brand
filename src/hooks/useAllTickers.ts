import { useQuery } from '@apollo/client';

import { allTickersQuery } from '../graphql';

export const useAllTickers = () => {
  const { data, error, loading } = useQuery(allTickersQuery);

  const { tickers } = data || [];

  return { error, loading, tickers };
};
