import { FC, useState } from 'react';
import tw from 'twin.macro';

export interface ITabItem {
  key: string;
  label: string;
}
interface TabsProps {
  items: ITabItem[];
}

export const Tabs: FC<TabsProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<string>(items[0].key);

  return (
    <div tw="w-full flex justify-center border-b border-gray-500">
      {items.map((item: ITabItem, index) => (
        <div
          key={index}
          css={[
            tw`w-32 text-center py-2 mx-1 hover:text-primary cursor-pointer`,
            item.key === activeTab &&
              tw`border-primary text-primary border-b-2`,
          ]}
          onClick={() => setActiveTab(item.key)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
