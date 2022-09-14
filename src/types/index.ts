export interface ITabItem {
  key: string;
  label: string;
}

export interface ITicker {
  id: string;
  shbBid: string;
  bidder: string;
  numberOfBidsReceived: number;
  tokenURI: string;
  imageURI: string;
  name: string;
  biddingEnd: string;
  uriLastUpdated: number;
}
