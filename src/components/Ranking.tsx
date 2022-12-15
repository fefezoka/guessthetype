import axios from 'axios';
import { SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';
import { RankingItems } from './RankingItems';
import { IoClose, IoReload } from 'react-icons/io5';

interface Ranking {
  wins: User[];
  winrate: User[];
  streak: User[];
}

type OrderBy = 'wins' | 'winrate' | 'streak';

interface Props {
  setRankingActive: React.Dispatch<SetStateAction<boolean>>;
}

export const Ranking = ({ setRankingActive }: Props) => {
  const [ActiveOrderBy, setActiveOrderBy] = useState<OrderBy>('winrate');

  const { data, refetch } = useQuery<Ranking>('ranking', async () => {
    const { data } = await axios.get('/api/user/ranking');
    return data;
  });

  if (!data) {
    return <></>;
  }

  return (
    <aside className="absolute right-0 top-0 bg-bg text-sm w-screen h-screen lg:w-[450px] lg:border-l lg:border-white">
      <div className="mt-8 relative">
        <h3 className="text-2xl">Ranking</h3>
        <IoClose
          className="absolute right-5 top-2 cursor-pointer"
          size={22}
          onClick={() => setRankingActive(false)}
        />
        <IoReload
          className="absolute left-5 top-1 cursor-pointer"
          size={22}
          onClick={() => refetch()}
        />
      </div>
      <div className="flex gap-4 justify-center py-2 border-b">
        <button onClick={() => setActiveOrderBy('winrate')}>Winrate</button>
        <button onClick={() => setActiveOrderBy('wins')}>Wins</button>
        <button onClick={() => setActiveOrderBy('streak')}>Streak</button>
      </div>

      <div>
        {ActiveOrderBy === 'streak' && <RankingItems ranking={data.streak} />}
        {ActiveOrderBy === 'winrate' && <RankingItems ranking={data.winrate} />}
        {ActiveOrderBy === 'wins' && <RankingItems ranking={data.wins} />}
      </div>
    </aside>
  );
};
