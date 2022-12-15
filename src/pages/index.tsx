import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useReducer, useState } from 'react';
import { useQuery } from 'react-query';
import { Button } from '../components/Button';
import { Ranking } from '../components/Ranking';
import { TypeIcon } from '../components/TypeIcon';
import { reducer, initialState } from '../reducers/gameReducer';

const MAX_POKEMONS = 905;

export default function Home() {
  const [gameData, dispatch] = useReducer(reducer, initialState);
  const [selectedTypes, setSelectedTypes] = useState<Type[]>([]);
  const [rankingActive, setRankingActive] = useState<boolean>(false);
  const { data: session } = useSession();

  const arr: Array<{
    name: Type;
    color: string;
  }> = [
    { name: 'grass', color: 'bg-[#7c5]' },
    { name: 'fire', color: 'bg-[#f42]' },
    { name: 'water', color: 'bg-[#39f]' },
    { name: 'bug', color: 'bg-[#ab2]' },
    { name: 'normal', color: 'bg-[#aa9]' },
    { name: 'poison', color: 'bg-[#a59]' },
    { name: 'ghost', color: 'bg-[#66b]' },
    { name: 'rock', color: 'bg-[#ba6]' },
    { name: 'electric', color: 'bg-[#fc3]' },
    { name: 'fighting', color: 'bg-[#b54]' },
    { name: 'flying', color: 'bg-[#89f]' },
    { name: 'steel', color: 'bg-[#aab]' },
    { name: 'dragon', color: 'bg-[#76e]' },
    { name: 'psychic', color: 'bg-[#f59]' },
    { name: 'dark', color: 'bg-[#754]' },
    { name: 'ground', color: 'bg-[#db5]' },
    { name: 'ice', color: 'bg-[#6ef]' },
    { name: 'fairy', color: 'bg-[#e9e]' },
  ];

  const { data: pokemon, refetch } = useQuery<Pokemon>(
    'poke',
    async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * MAX_POKEMONS)}`
      );
      return data;
    },
    { refetchOnWindowFocus: false }
  );

  if (!pokemon) {
    return;
  }

  const guessTheType = async () => {
    if (selectedTypes.length === 0 || gameData.guessed) {
      return;
    }

    const filter = pokemon.types
      .map((type) => {
        return type.type.name;
      })
      .sort();

    const equal = JSON.stringify(filter) === JSON.stringify(selectedTypes.sort());
    equal ? dispatch({ type: 'right' }) : dispatch({ type: 'wrong' });

    session && updateUserOnDB(equal);
  };

  const updateUserOnDB = async (win: boolean) => {
    if (!session) {
      return;
    }

    win
      ? await axios.post(`/api/user/win`, {
          id: session.user.id,
          streak: gameData.streak + 1,
        })
      : await axios.post('/api/user/lose', { id: session.user.id });
  };

  const insertGuess = (guess: Type) => {
    if (gameData.guessed) {
      return;
    }

    if (selectedTypes.includes(guess)) {
      setSelectedTypes((t) => [...t.filter((t) => t !== guess)]);
    } else {
      setSelectedTypes((t) => [...t, guess]);
    }
  };

  return (
    <>
      <Head>
        <title>Guess the type</title>
      </Head>

      <header className="flex justify-center mt-4">
        <nav>
          <ul className="flex gap-10 font-bold">
            <li>
              <button onClick={() => setRankingActive((r) => !r)}>Ranking</button>
            </li>
            <li>
              {session ? (
                <div className="flex items-center gap-2">
                  <div className="overflow-hidden rounded-full h-8 w-8 relative">
                    <Image src={session.user.image} alt="" fill />
                  </div>
                  <span>{session.user.name}</span>
                  <button onClick={() => signOut()}>Sign out</button>
                </div>
              ) : (
                <div>
                  Login with <button onClick={() => signIn('discord')}>Discord</button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main className="mt-2 flex justify-center flex-col items-center text-center gap-10 lg:mt-8">
        <div className="relative">
          <div className="w-[240px] h-[240px] lg:w-[320px] lg:h-[320px] relative">
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              priority
              alt=""
              fill
            />
          </div>
          <div className="absolute top-5 -right-16">
            {pokemon.types.map((type) => (
              <div key={type.type.name} className="mb-2">
                <TypeIcon
                  pokemonType={
                    (gameData.guessed && arr.find((f) => f.name === type.type.name)) || {
                      name: 'unknown',
                      color: 'bg-[#ccc]',
                    }
                  }
                />
              </div>
            ))}
          </div>

          <div className="absolute top-5 -left-16 text-xl font-bold">
            <h3>Streak</h3>
            <h3>{gameData.streak}</h3>
          </div>
          <h2 className="capitalize text-2xl font-semibold">{pokemon.name}</h2>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
          {arr.map((type) => (
            <TypeIcon
              key={type.name}
              pokemonType={type}
              onClick={() => insertGuess(type.name as Type)}
              active={selectedTypes.includes(type.name)}
            >
              {type.name}
            </TypeIcon>
          ))}
        </div>

        {gameData.guessed ? (
          <Button
            type="button"
            onClick={() => {
              refetch();
              dispatch({ type: 'reset' });
              setSelectedTypes([]);
            }}
            color={gameData.rightAnswer ? 'green' : 'red'}
          >
            <p>{gameData.rightAnswer ? 'Right' : 'Wrong'}</p>
          </Button>
        ) : (
          <Button onClick={() => guessTheType()} disabled={selectedTypes.length === 0}>
            Guess
          </Button>
        )}

        {rankingActive && <Ranking setRankingActive={setRankingActive} />}
      </main>
    </>
  );
}
