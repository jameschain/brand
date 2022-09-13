import 'twin.macro';

import { FC } from 'react';

import { WalletButton } from '../components';

export const Home: FC = () => {
  return (
    <div tw="w-full flex justify-center items-center">
      <WalletButton />
    </div>
  );
};
