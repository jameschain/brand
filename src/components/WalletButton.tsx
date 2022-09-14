import 'twin.macro';

import { FC, useState } from 'react';

import { useWallet } from '../context';
import { formatAddress } from '../utils';
import { Button } from './';
import { WalletModal } from './modals';

export const WalletButton: FC = () => {
  const { address, selectWallet } = useWallet();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const isConnected = address != null;

  const handleClick = async () => {
    if (address) {
      setModalVisible(true);
    } else {
      await selectWallet();
    }
  };

  return (
    <>
      {modalVisible && <WalletModal onClose={() => setModalVisible(false)} />}
      <Button primary={!isConnected} onClick={handleClick}>
        {isConnected && <div tw="w-2 h-2 rounded-full bg-primary mr-2" />}
        {isConnected ? formatAddress(address) : 'Unlock Wallet'}
      </Button>
    </>
  );
};
