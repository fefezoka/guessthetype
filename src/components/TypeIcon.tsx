import React from 'react';
import { keyframes, styled } from 'stitches.config';

const shake = keyframes({
  '0%': { transform: 'skewY(-12deg)' },
  '5%': { transform: 'skewY(12deg)' },
  '10% ': { transform: 'skewY(-12deg)' },
  '15% ': { transform: 'skewY(12deg)' },
  '20% ': { transform: 'skewY(0deg) ' },
  '100%': { transform: 'skewY(0deg) ' },
});

const StyledTypeIcon = styled('button', {
  width: 90,
  textAlign: 'center',
  textTransform: 'uppercase',
  lh: '2.25rem',
  br: '$2',
  textShadow: '2px 2px 4px #000',
  fontSize: '$3',
  border: '1px solid rgb(0,0,0,.5)',
  transition: 'all 200ms',

  '&:hover': {
    filter: 'brightness(110%) saturate(120%)',
  },

  variants: {
    pokeType: {
      grass: { bc: '$grass' },
      fire: { bc: '$fire' },
      water: { bc: '$water' },
      bug: { bc: '$bug' },
      normal: { bc: '$normal' },
      ground: { bc: '$ground' },
      rock: { bc: '$rock' },
      poison: { bc: '$poison' },
      electric: { bc: '$electric' },
      fighting: { bc: '$fighting' },
      flying: { bc: '$flying' },
      steel: { bc: '$steel' },
      dragon: { bc: '$dragon' },
      psychic: { bc: '$psychic' },
      dark: { bc: '$dark' },
      ghost: { bc: '$ghost' },
      ice: { bc: '$ice' },
      fairy: { bc: '$fairy' },
      unknown: { bc: '$bg-3' },
    },
    active: {
      true: {
        boxShadow: '0 0 0 2px #fb923c',
        borderColor: 'transparent',
      },
    },
    lose: {
      true: {
        animation: `800ms ${shake} linear`,
      },
    },
  },
});

export const TypeIcon = ({
  pokeType,
  ...props
}: React.ComponentProps<typeof StyledTypeIcon>) => {
  return (
    <StyledTypeIcon type="button" pokeType={pokeType} {...props}>
      {pokeType as string}
    </StyledTypeIcon>
  );
};
