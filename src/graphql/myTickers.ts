import { gql } from '@apollo/client';

export const myTickersQuery = gql`
  query MyTickers {
    tickers(
      where: { bidder: $bidder }
      orderBy: uriLastUpdated
      orderDirection: desc
    ) {
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
