import React from 'react';
import { styled } from 'stitches.config';

interface ITypeIcon extends React.ComponentProps<typeof StyledTypeIcon> {
  pokeType: Type;
  active?: boolean;
}

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
    filter: 'brightness(110%) saturate(130%)',
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
  },
});

export const TypeIcon = ({ pokeType, ...props }: ITypeIcon) => {
  return (
    <StyledTypeIcon type="button" pokeType={pokeType} {...props}>
      {pokeType}
    </StyledTypeIcon>
  );
};
