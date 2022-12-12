import React from 'react';
import { TypeIcon as StyledTypeIcon } from './style';

interface Props extends React.ComponentProps<typeof StyledTypeIcon> {
  type: Type;
  active?: boolean;
}

export const TypeIcon = ({ type, active, ...props }: Props) => {
  return (
    <StyledTypeIcon {...props} type={type} active={active}>
      {type}
    </StyledTypeIcon>
  );
};
