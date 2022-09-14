import 'twin.macro';

import { XCircleOutline } from 'heroicons-react';
import { FC } from 'react';

import { useWallet } from '../../context';
import { formatAddress } from '../../utils';
import { Button } from '../Button';

interface WalletModalProps {
  onClose: () => void;
}

export const WalletModal: FC<WalletModalProps> = ({ onClose }) => {
  const { address, logoutWallet } = useWallet();

  return (
    <div tw="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
      <div tw="bg-dark relative max-w-3xl py-20 px-32 rounded-lg flex flex-col items-center">
        <XCircleOutline
          tw="w-7 h-7 absolute right-3 top-3 cursor-pointer"
          onClick={onClose}
        />
        <div tw="font-bold">My Account</div>
        <div tw="flex items-center mt-5 mb-7 text-sm bg-white bg-opacity-5 px-4 py-2 rounded-full">
          <div tw="w-2 h-2 rounded-full bg-primary mr-2" />
          {formatAddress(address ?? '')}
        </div>
        <Button
          onClick={() => {
            logoutWallet();
            onClose();
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};
