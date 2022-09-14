import 'twin.macro';

import { FC, useEffect, useState } from 'react';

import { NFTCard, Tabs } from '../../components';
import { Loader } from '../../components/Loader';
import { useWallet } from '../../context';
import { useAllTickers } from '../../hooks';
import { ITabItem, ITicker } from '../../types';

const tabItems: ITabItem[] = [
  { key: 'all', label: 'Show All' },
  { key: 'user-ticker', label: 'My Tickers' },
  { key: 'battle-space', label: 'Battle Space' },
];

export const NFTGrid: FC = () => {
  const { loading, tickers } = useAllTickers();
  const { web3Provider } = useWallet();

  const [currentBlock, setCurrentBlock] = useState<number>();

  useEffect(() => {
    const getBlockNumber = async () => {
      const _currentBlock = await web3Provider?.getBlockNumber();

      setCurrentBlock(_currentBlock);
    };

    getBlockNumber();
  }, [web3Provider]);

  const [activeTab, setActiveTab] = useState<string>(tabItems[0].key);
  return (
    <div tw="w-full flex-grow sm:px-12">
      <Tabs
        activeTab={activeTab}
        items={tabItems}
        setActiveTab={setActiveTab}
      />
      {loading && <Loader />}
      {!loading && (
        <div tw="p-4 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {activeTab === 'all' &&
            tickers.map((item: ITicker, index: number) => (
              <NFTCard key={index} ticker={item} />
            ))}
        </div>
      )}
      <div tw="text-gray-400 text-center">Current Block: {currentBlock}</div>
    </div>
  );
};
