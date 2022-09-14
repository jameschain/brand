# Brand BlockSwap Clone App

Demo App Link [https://brand-blockswap.netlify.app/](https://brand-blockswap.netlify.app/).

## Development

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Description

- TailWindCSS is used for the UI components and some color codes are copied from blockswap websites. Those codes can be found `tailwind.config.js`
- Integrated the [Subgraph](https://thegraph.com/hosted-service/subgraph/vince0656/brand-central?version=current) data using Apollo Client. (both query, subscription client are introduced)
- Custom hooks are introduced for allTickers, and myTickers data from the subgraph - `useAllTickers`, `useMyTickers`.
- WalletConnection is implemented with `Blocknative` package. `WalletContext` is introduced and we can get wallet related data by context hook - `useWallet`.
- Previously selected wallets are being kept in `localStorage`.

## Uncertain point

```
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
```

GraphQL queries are written to sort the tickers with `uriLastUpdated` field. I think it would be `timestamp` but currently the theGraph api endpoint is returning `0` for the all tickers.
