import { styled } from 'stitches.config';

export const Button = styled('button', {
  width: 108,
  lh: '2.25rem',
  ta: 'center',
  textTransform: 'uppercase',
  br: '$2',
  border: '1px solid rgb(0,0,0,.2)',
  transition: 'all 200ms ease-in',
  bc: '$bg-4',
  fontSize: '$3',
  textShadow: '2px 2px 4px #000',

  '&:hover': { filter: 'brightness(110%) saturate(130%)' },
  '&:disabled': { bc: '#3c4a5f' },

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
    win: {
      true: {
        fontWeight: 600,
        bc: '#7c5',
      },
      false: {
        fontWeight: 600,
        bc: '#f42',
      },
    },
    active: {
      true: {
        borderColor: 'transparent',
        boxShadow: '0 0 2px 2px var(--colors-blue-1)',
      },
    },
  },
});
