import { ethers } from 'ethers';
import { FC } from 'react';
import tw from 'twin.macro';

import { ITicker } from '../types';
import { formatAddress } from '../utils';

interface NFTCardProps {
  ticker: ITicker;
}

const InfoField: FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => {
  return (
    <div tw="flex items-baseline">
      <div tw="w-24 text-left text-xs text-gray-400">{label} :</div>
      <div tw="flex-grow text-left ml-2 text-base font-semibold text-gray-300">
        {value}
      </div>
    </div>
  );
};

export const NFTCard: FC<NFTCardProps> = ({ ticker }) => {
  const hasTokenURI = ticker.tokenURI.length > 0;

  return (
    <div tw="bg-gray-800 rounded-md py-7 flex flex-col">
      <div tw="mx-auto">
        <div tw="w-full flex flex-col justify-center items-center mb-5">
          {hasTokenURI && (
            <img
              alt="nft"
              src={ticker.tokenURI}
              tw="w-36 mx-auto rounded-xl mb-1"
            />
          )}
          <div
            css={[
              tw`w-full text-center text-2xl text-primary`,
              hasTokenURI && tw`text-lg`,
            ]}
          >
            {ticker.id}
          </div>
        </div>

        <InfoField label="Bid Count" value={ticker.numberOfBidsReceived} />
        <InfoField
          label="Winning Bid"
          value={`${ethers.utils.formatEther(ticker.shbBid)} SHB`}
        />
        <InfoField label="Winner" value={formatAddress(ticker.bidder)} />
        <InfoField label="End Block" value={ticker.biddingEnd} />
        <InfoField label="Time Left" value="Finished" />
      </div>
    </div>
  );
};
