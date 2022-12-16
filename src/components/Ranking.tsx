import axios from 'axios';
import { SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';
import { RankingItems } from './RankingItems';
import { IoClose, IoReload } from 'react-icons/io5';
import Spinner from '../assets/Spinner.svg';
import Image from 'next/image';

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
  const [activeOrderBy, setActiveOrderBy] = useState<OrderBy>('winrate');

  const { data, isLoading, refetch } = useQuery<Ranking>('ranking', async () => {
    const { data } = await axios.get('/api/user/ranking');
    return data;
  });

  return (
    <aside className="absolute right-0 top-0 bg-bg text-sm w-screen h-screen lg:w-[450px] lg:border-l lg:border-white">
      <div className="mt-8 relative">
        <h3 className="text-2xl font-bold">Ranking</h3>
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
        <button
          type="button"
          className={`${activeOrderBy === 'winrate' ? 'border-b font-bold' : ''}`}
          onClick={() => setActiveOrderBy('winrate')}
        >
          Winrate
        </button>
        <button
          type="button"
          className={`${activeOrderBy === 'wins' ? 'border-b font-bold' : ''}`}
          onClick={() => setActiveOrderBy('wins')}
        >
          Wins
        </button>
        <button
          type="button"
          className={`${activeOrderBy === 'streak' ? 'border-b font-bold' : ''}`}
          onClick={() => setActiveOrderBy('streak')}
        >
          Streak
        </button>
      </div>

      <div>
        {isLoading && (
          <div className="flex justify-center mt-2">
            <Image src={Spinner} alt="" height={48} width={48} />
          </div>
        )}
        {data &&
          ((activeOrderBy === 'streak' && <RankingItems ranking={data.streak} />) ||
            (activeOrderBy === 'winrate' && <RankingItems ranking={data.winrate} />) ||
            (activeOrderBy === 'wins' && <RankingItems ranking={data.wins} />))}
      </div>
    </aside>
  );
};
