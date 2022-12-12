import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useReducer, useState } from 'react';
import { useQuery } from 'react-query';
import { Button } from '../components/button/Button';
import { Main } from '../components/main/Main';
import { TypeIcon } from '../components/typeIcon/TypeIcon';
import { TypesGrid } from '../components/typesGrid/TypesGrid';
import { reducer, initialState } from '../reducers/gameReducer';

const MAX_POKEMONS = 1007;

export default function Home() {
  const [gameData, dispatch] = useReducer(reducer, initialState);
  const [guessed, setGuessed] = useState<boolean>(false);
  const [rightAnswer, setRightAnswer] = useState<boolean>(false);
  const [selectedTypes, setSelectedTypes] = useState<Type[]>([]);

  const arr = [
    'grass',
    'fire',
    'water',
    'bug',
    'normal',
    'poison',
    'ghost',
    'rock',
    'electric',
    'fighting',
    'flying',
    'steel',
    'dragon',
    'psychic',
    'dark',
    'ground',
    'ice',
    'fairy',
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

  const guessTheType = () => {
    if (selectedTypes.length === 0 || gameData.guessed) {
      return;
    }

    const filter = pokemon.types
      .map((type) => {
        return type.type.name;
      })
      .sort();

    JSON.stringify(filter) === JSON.stringify(selectedTypes.sort())
      ? (() => dispatch({ type: 'right' }))()
      : dispatch({ type: 'wrong' });
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
      <Main>
        <div style={{ position: 'relative' }}>
          <Image
            src={pokemon?.sprites.other['official-artwork'].front_default}
            alt=""
            width={320}
            height={320}
          />
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '0',
            }}
          >
            {pokemon.types.map((type) => (
              <div key={type.type.name}>
                <TypeIcon
                  type={gameData.guessed ? type.type.name : 'unknown'}
                  style={{ marginBottom: '.5rem' }}
                />
              </div>
            ))}
          </div>
          <h2 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h2>
        </div>

        <TypesGrid>
          {arr.map((type) => (
            <TypeIcon
              key={type}
              onClick={() => insertGuess(type as Type)}
              type={type as Type}
              active={selectedTypes.includes(type as Type)}
            />
          ))}
        </TypesGrid>

        <div>
          <Button onClick={() => guessTheType()}>Guess</Button>
        </div>

        {gameData.guessed && (
          <div>
            <p>{gameData.rightAnswer ? 'Acertou' : 'Errou'}</p>

            <Button
              onClick={() => {
                refetch();
                dispatch({ type: 'reset' });
                setSelectedTypes([]);
              }}
            >
              Continue
            </Button>
          </div>
        )}
      </Main>
    </>
  );
}
