import 'twin.macro';

import { FC } from 'react';

export const Loader: FC = () => {
  return (
    <div tw="w-full h-full flex items-center justify-center ">
      <div tw="w-8 h-8 border-b-2 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};
