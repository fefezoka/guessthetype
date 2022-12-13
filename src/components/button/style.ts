import { styled } from '../../styles/stitches.config';

export const Button = styled('button', {
  display: 'inline-block',
  fontSize: '14px',
  width: '108px',
  lineHeight: '2.5rem',
  color: 'white',
  textAlign: 'center',
  marginright: '5px',
  textTransform: 'uppercase',
  borderRadius: '5px',
  backgroundColor: 'rgb(80, 100, 125)',
  border: '1.5px solid rgba(0, 0, 0, 0.2)',
  transition: 'all 200ms',

  '&:hover': {
    transform: 'scale(1.07)',
  },

  '&:disabled': {
    backgroundColor: 'rgb(60, 74, 95)',
  },

  variants: {
    color: {
      red: {
        backgroundColor: '#f42',
      },
      green: {
        backgroundColor: '#7c5',
      },
    },
  },
});
