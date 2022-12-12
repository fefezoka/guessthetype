import React, { ReactNode } from 'react';
import { Main as StyledMain } from './style';

interface Props {
  children: ReactNode;
}

export const Main = ({ children }: Props) => {
  return <StyledMain>{children}</StyledMain>;
};
