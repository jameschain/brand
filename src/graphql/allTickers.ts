import { gql } from '@apollo/client';

export const allTickersQuery = gql`
  query AllTickers {
    tickers(orderBy: uriLastUpdated, orderDirection: desc) {
      id
      shbBid
      bidder
      biddingEnd
      numberOfBidsReceived
      name
      tokenURI
      imageURI
      uriLastUpdated
    }
  }
`;
