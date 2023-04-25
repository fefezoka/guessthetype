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
  border: '1px solid rgb(0,0,0,.2)',
  transition: 'all 200ms ease-in',
  bc: '$bg-4',
  fontSize: '$3',

  '&:hover': { filter: 'brightness(110%) saturate(130%)' },
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
        borderColor: 'transparent',
        boxShadow: '0 0 2px 2px var(--colors-blue-1)',
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
