import 'twin.macro';

import { FC, useEffect, useState } from 'react';

import { NFTCard, Tabs } from '../../components';
import { Loader } from '../../components/Loader';
import { useWallet } from '../../context';
import { useAllTickers, useMyTickers } from '../../hooks';
import { ITabItem, ITicker } from '../../types';

const tabItems: ITabItem[] = [
  { key: 'all', label: 'Show All' },
  { key: 'myTickers', label: 'My Tickers' },
  { key: 'battleSpace', label: 'Battle Space' },
];

export const NFTGrid: FC = () => {
  const { address, web3Provider } = useWallet();
  const { loading: allTickersLoading, tickers: allTickers } = useAllTickers();
  const { loading: myTickersLoading, tickers: myTickers } = useMyTickers(
    address || ''
  );
  const [isNoRecord, setIsNoRecord] = useState<boolean>(false);

  const loading = allTickersLoading || myTickersLoading;

  const [currentBlock, setCurrentBlock] = useState<number>();
  const [activeTab, setActiveTab] = useState<string>(tabItems[0].key);

  useEffect(() => {
    const getBlockNumber = async () => {
      const _currentBlock = await web3Provider?.getBlockNumber();

      setCurrentBlock(_currentBlock);
    };
    if (!loading) {
      setIsNoRecord(activeTab === 'all' && allTickers.length === 0);
      setIsNoRecord(activeTab === 'myTickers' && myTickers.length === 0);
    }

    getBlockNumber();
  }, [activeTab, loading, web3Provider, allTickers, myTickers]);

  return (
    <div tw="w-full flex-grow sm:px-12 flex flex-col">
      <Tabs
        activeTab={activeTab}
        items={tabItems}
        setActiveTab={setActiveTab}
      />
      {loading && <Loader />}
      {!loading && !isNoRecord && (
        <div tw="p-4 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {activeTab === 'all' &&
            allTickers.map((item: ITicker, index: number) => (
              <NFTCard key={index} ticker={item} />
            ))}

          {activeTab === 'myTickers' &&
            myTickers.map((item: ITicker, index: number) => (
              <NFTCard key={index} ticker={item} />
            ))}
        </div>
      )}
      {isNoRecord && (
        <div tw="flex-grow flex justify-center items-center">
          No Records Found
        </div>
      )}

      <div tw="text-gray-400 text-center">Current Block: {currentBlock}</div>
    </div>
  );
};
