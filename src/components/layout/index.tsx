import 'twin.macro';

import { FC } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: FC = ({ children }) => {
  return (
    <div tw="flex flex-col min-h-full-view bg-dark text-white font-montserrat">
      <Header />
      <div tw="flex flex-grow relative w-full">{children}</div>
      <Footer />
    </div>
  );
};
