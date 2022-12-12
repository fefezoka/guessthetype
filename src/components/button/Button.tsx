import React, { ReactNode } from 'react';
import { Button as StyledButton } from './style';

interface Props extends React.ComponentProps<typeof StyledButton> {
  children: ReactNode;
}

export const Button = ({ children, ...props }: Props) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
