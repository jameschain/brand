import 'twin.macro';

import { FC } from 'react';

import { WalletButton } from '../';

export const Header: FC = () => {
  return (
    <header tw="w-full flex justify-between p-6">
      <div></div>
      <WalletButton>Unlock Wallet</WalletButton>
    </header>
  );
};
