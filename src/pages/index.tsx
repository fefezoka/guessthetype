import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useReducer, useState } from 'react';
import { reducer, initialState } from '../reducers/gameReducer';
import Spinner from '../assets/Spinner.svg';
import { trpc } from '../utils/trpc';
import { Box, Flex, Grid, Heading, Text } from '@styles';
import { Header, Button, TypeIcon } from '@components';
import { NextSeo } from 'next-seo';

const types: Array<Type> = [
  'grass',
  'fire',
  'water',
  'bug',
  'normal',
  'ground',
  'rock',
  'poison',
  'electric',
  'fighting',
  'flying',
  'steel',
  'dragon',
  'psychic',
  'dark',
  'ghost',
  'ice',
  'fairy',
];

export default function Home() {
  const [gameData, dispatch] = useReducer(reducer, initialState);
  const [selectedTypes, setSelectedTypes] = useState<Type[]>([]);
  const { data: session, status } = useSession();
  const win = trpc.win.useMutation();
  const lose = trpc.lose.useMutation();

  const { data: pokemon, refetch } = trpc.pokemon.useQuery();

  if (status === 'loading') {
    return (
      <Flex
        justify={'center'}
        align={'center'}
        direction={'column'}
        css={{ height: '100vh' }}
      >
        <Heading size="3">Guess the Type</Heading>
        <Image src={Spinner} alt="" height={52} width={52} />
      </Flex>
    );
  }

  if (!pokemon) {
    return <></>;
  }

  const insertGuess = (guess: Type) => {
    if (gameData.guessed) {
      return;
    }

    if (selectedTypes.includes(guess)) {
      setSelectedTypes(selectedTypes.filter((type) => type !== guess));
    } else {
      setSelectedTypes([...selectedTypes, guess]);
    }
  };

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

    if (!session) {
      return;
    }

    equal ? win.mutate({ streak: gameData.streak }) : lose.mutate();
  };

  return (
    <>
      <NextSeo title="Guess the Type" />
      <Header />
      <Box
        as={'main'}
        css={{
          ta: 'center',
          m: '$5 auto 0',
          '@bp2': { maxWidth: 'fit-content' },
        }}
      >
        <Flex align={'center'} justify={'center'}>
          <Box css={{ size: 240, position: 'relative', '@bp2': { size: 300 } }}>
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              priority
              alt=""
              fill
            />
            <Box css={{ position: 'absolute', top: 16, right: -32 }}>
              {pokemon.types.map((type) => (
                <Box css={{ mb: '$2' }} key={type.type.name}>
                  <TypeIcon
                    pokeType={
                      (gameData.guessed && types.find((t) => t === type.type.name)) ||
                      'unknown'
                    }
                  />
                </Box>
              ))}
            </Box>
            <Box css={{ position: 'absolute', top: 16, left: -32 }}>
              <Text as={'p'} weight={600}>
                Streak
              </Text>
              <Text weight={600}>{gameData.streak}</Text>
            </Box>
          </Box>
        </Flex>

        <Heading size="3" css={{ textTransform: 'capitalize', lh: 'unset' }}>
          {pokemon.name}
        </Heading>

        <Box>
          <Grid
            columns={{ '@initial': 3, '@bp2': 6 }}
            gap={{ '@initial': '2', '@bp2': '3' }}
            css={{ my: '$3', width: 'fit-content', mx: 'auto' }}
          >
            {types.map((type) => (
              <TypeIcon
                key={type}
                pokeType={type}
                onClick={() => insertGuess(type)}
                active={selectedTypes.includes(type)}
              >
                {type}
              </TypeIcon>
            ))}
          </Grid>
        </Box>
        {gameData.guessed ? (
          <Button
            type="button"
            onClick={() => {
              refetch();
              dispatch({ type: 'reset' });
              setSelectedTypes([]);
            }}
            win={gameData.rightAnswer}
          >
            {gameData.rightAnswer ? 'Right' : 'Wrong'}
          </Button>
        ) : (
          <Button
            onClick={guessTheType}
            disabled={selectedTypes.length !== pokemon.types.length}
          >
            Guess
          </Button>
        )}
      </Box>
    </>
  );
}
