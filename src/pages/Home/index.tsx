import 'twin.macro';

import { FC } from 'react';

import { WalletButton } from '../../components';
import { useWallet } from '../../context';
import { ClaimSection } from './ClaimSection';
import { NFTGrid } from './NFTGrid';

export const Home: FC = () => {
  const { address } = useWallet();

  return (
    <div tw="w-full flex flex-col items-center justify-between">
      {!address && (
        <div tw="flex-grow flex items-center justify-center">
          <WalletButton />
        </div>
      )}
      {address && (
        <>
          <ClaimSection />
          <NFTGrid />
        </>
      )}
    </div>
  );
};
