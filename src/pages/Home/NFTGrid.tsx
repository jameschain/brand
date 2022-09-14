import 'twin.macro';

import { FC, useState } from 'react';

import { ITabItem, NFTCard, Tabs } from '../../components';

export const NFTGrid: FC = () => {
  const tabItems: ITabItem[] = [
    { key: 'all', label: 'Show All' },
    { key: 'user-ticker', label: 'My Tickers' },
    { key: 'battle-space', label: 'Battle Space' },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabItems[0].key);
  return (
    <div tw="w-full flex-grow px-12">
      <Tabs
        activeTab={activeTab}
        items={tabItems}
        setActiveTab={setActiveTab}
      />

      <div tw="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {activeTab === 'all' &&
          Array(30)
            .fill(2)
            .map((item, index) => <NFTCard key={index} />)}
      </div>
    </div>
  );
};
