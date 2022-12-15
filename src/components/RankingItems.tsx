import Image from 'next/image';
import React, { memo } from 'react';

interface Props {
  ranking: User[];
}

export const RankingItems = memo(({ ranking }: Props) => {
  return (
    <ul>
      {ranking.map((user, index) => (
        <li
          className="flex gap-4 py-9 px-4 odd:bg-bgalt items-center justify-between max-h-9 border-b border-white"
          key={user.id}
        >
          <div className="flex items-center gap-4">
            <p>{index + 1}º</p>
            <div className="border-2 border-white w-12 h-12 overflow-hidden rounded-full">
              <Image src={user.image} alt="" height={48} width={48} />
            </div>
            <div className="text-left">
              <p>{user.name}</p>
            </div>
          </div>
          <div className="text-left">
            <p>
              {user.wins} wins in {user.rounds} rounds
            </p>
            <p>Winrate: {user.winrate.toFixed(1)}%</p>
            <p>Max streak: {user.maxStreak}</p>
          </div>
        </li>
      ))}
    </ul>
  );
});

RankingItems.displayName = 'RankingItems';
