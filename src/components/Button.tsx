import React, { forwardRef } from 'react';
import { styled } from 'stitches.config';

interface Props extends React.ComponentProps<typeof StyledButton> {
  color?: 'green' | 'red';
}

const StyledButton = styled('button', {
  width: 108,
  lh: '2.25rem',
  ta: 'center',
  textTransform: 'uppercase',
  br: '$2',
  border: '1.5px solid rgb(0,0,0,.2)',
  transition: 'all 200ms ease-in',
  bc: '$bg-4',
  fontSize: '$3',

  '&:hover': { transform: 'scale(103%)' },
  '&:disabled': { bc: '#3c4a5f' },

  variants: {
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
        borderWidth: 2,
        borderColor: '$blue-1',
      },
    },
  },
});

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ color, children, ...props }: Props, forwardedRef) => {
    return (
      <StyledButton type="button" {...props} ref={forwardedRef}>
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
