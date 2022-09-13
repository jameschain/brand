import 'twin.macro';

import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer tw="text-center text-gray-500 p-6">
      <a
        href="https://etherscan.io/address/0x4ea67aebb61f7ff6e15e237c8b79d29c41f750fd"
        rel="noreferrer"
        target="_blank"
      >
        Contract
      </a>
    </footer>
  );
};
