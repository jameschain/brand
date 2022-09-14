import 'twin.macro';

import { FC } from 'react';

import { Button } from '../../components';

export const ClaimSection: FC = () => {
  return (
    <div tw="w-full flex flex-col items-center py-10">
      <div tw="text-4xl">Claim your SHB</div>
      <div tw="max-w-2xl text-center mt-6 mb-4 text-lg">
        Separate your SHB from your Brand NFT. Doing this will leave you with
        SHB and your Brand NFT in your wallet. You still maintain your naming
        rights for your Stakehouse in mainnet as long as you hold the NFT.
      </div>
      <Button primary tw="text-base">
        Learn More
      </Button>
    </div>
  );
};
