import 'twin.macro';

import { FC } from 'react';

const nftInfo = [
  { label: 'Bid Count', value: '1' },
  { label: 'Winning Bid', value: '100 SHB' },
  { label: 'End Block', value: '13440825' },
  { label: 'Winner', value: 'Oxba26...4483' },
  { label: 'Time Left', value: 'Finished' },
];

export const NFTCard: FC = () => {
  return (
    <div tw="bg-gray-800 rounded-md py-7 flex flex-col">
      <div tw="mx-auto">
        <img
          alt="nft"
          src="https://pbs.twimg.com/profile_images/1391868018167357440/OEx8XG_b.jpg"
          tw="w-36 mx-auto rounded-xl mb-5"
        />
        {nftInfo.map((item, index) => (
          <div key={index} tw="flex items-baseline ">
            <div tw="w-24 text-left text-xs text-gray-400">{item.label} :</div>
            <div tw="flex-grow text-left ml-2 text-base font-semibold text-gray-300">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
