import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useGameStates } from '../reducers/gameReducer';
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
  const { data: session, status } = useSession();
  const [game, dispatch] = useGameStates();
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
    if (game.guessed) {
      return;
    }

    if (game.selectedTypes.includes(guess)) {
      dispatch({ type: 'popGuess', payload: { guess: guess } });
    } else {
      game.selectedTypes.length !== pokemon.types.length &&
        dispatch({ type: 'pushGuess', payload: { guess: guess } });
    }
  };

  const guessTheType = async () => {
    if (game.selectedTypes.length === 0 || game.guessed) {
      return;
    }

    const filter = pokemon.types
      .map((type) => {
        return type.type.name;
      })
      .sort();

    const equal = JSON.stringify(filter) === JSON.stringify(game.selectedTypes.sort());
    equal ? dispatch({ type: 'right' }) : dispatch({ type: 'wrong' });

    if (!session) {
      return;
    }

    equal ? win.mutate({ streak: game.streak }) : lose.mutate();
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
          maxWidth: 'fit-content',
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
            <Box css={{ position: 'absolute', top: 16, right: -28 }}>
              {pokemon.types.map((type, index) => (
                <Box css={{ mb: '$1' }} key={type.type.name}>
                  <TypeIcon
                    css={{ lh: '2.175rem', fontSize: '$2', width: 84 }}
                    type="button"
                    lose={game.guessed && !game.rightAnswer}
                    pokeType={
                      (game.guessed
                        ? types.find((t) => t === type.type.name)
                        : game.selectedTypes[index]) || 'unknown'
                    }
                  />
                </Box>
              ))}
            </Box>
            <Box css={{ position: 'absolute', top: 16, left: -26 }}>
              <Text as={'p'} weight={600} size={'4'}>
                Streak
              </Text>
              <Text weight={600} size={'4'}>
                {game.streak}
              </Text>
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
                type="button"
                key={type}
                pokeType={type}
                onClick={() => insertGuess(type)}
                active={game.selectedTypes.includes(type)}
              />
            ))}
          </Grid>
        </Box>
        {game.guessed ? (
          <Button
            type="button"
            onClick={() => {
              refetch();
              dispatch({ type: 'reset' });
            }}
            win={game.rightAnswer}
          >
            {game.rightAnswer ? 'Right' : 'Wrong'}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={guessTheType}
            disabled={game.selectedTypes.length !== pokemon.types.length}
          >
            Guess
          </Button>
        )}
      </Box>
    </>
  );
}
