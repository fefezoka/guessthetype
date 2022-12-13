import { styled } from '../../styles/stitches.config';

export const Main = styled('main', {
  margin: '.5rem 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '2.5rem',

  '@dsk2': {
    margin: '2rem 0',
  },
});
