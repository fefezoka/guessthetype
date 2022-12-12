import { styled } from '../../styles/stitches.config';

export const TypeIcon = styled('button', {
  display: 'inline-block',
  fontSize: '14px',
  width: '92px',
  lineHeight: '2.25rem',
  textAlign: 'center',
  marginright: '5px',
  textTransform: 'uppercase',
  borderRadius: '5px',
  border: '1.5px solid rgba(0, 0, 0, 0.2)',
  textShadow: '2px 2px 2px rgba(0, 0, 0, 0.7)',
  transition: 'all 200ms linear',

  '&:hover': {
    transform: 'translate(0%, -15%)',
  },

  variants: {
    type: {
      fire: { backgroundColor: '#f42' },
      water: { backgroundColor: '#39f' },
      grass: { backgroundColor: '#7c5' },
      rock: { backgroundColor: '#ba6' },
      ground: { backgroundColor: '#db5' },
      normal: { backgroundColor: '#aa9' },
      electric: { backgroundColor: '#fc3' },
      bug: { backgroundColor: '#ab2' },
      dragon: { backgroundColor: '#76e' },
      fairy: { backgroundColor: '#e9e' },
      ice: { backgroundColor: '#6ef' },
      steel: { backgroundColor: '#aab' },
      ghost: { backgroundColor: '#66b' },
      flying: { backgroundColor: '#89f' },
      poison: { backgroundColor: '#a59' },
      fighting: { backgroundColor: '#b54' },
      dark: { backgroundColor: '#754' },
      psychic: { backgroundColor: '#f59' },
      unknown: { backgroundColor: '#ddd' },
    },
    active: {
      true: {
        border: '2px solid orange',
        transform: 'translate(0%, -15%)',
        transitionDuration: '200ms',
      },
    },
  },
});
