import { styled } from '../../styles/stitches.config';

export const TypesGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '.5rem',

  '@dsk2': {
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
    gap: '.75rem',
  },
});
