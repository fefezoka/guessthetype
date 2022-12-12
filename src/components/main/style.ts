import { styled } from '../../styles/stitches.config';

export const Main = styled('main', {
  maxWidth: '1152px',
  margin: '.5rem auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '2.5rem',

  '@dsk2': {
    margin: '2rem auto',
  },
});
