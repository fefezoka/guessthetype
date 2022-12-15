import React, { ReactNode } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: 'green' | 'red';
}

export const Button = ({ color, children, ...props }: Props) => {
  const bg = color ? (color === 'green' ? 'bg-[#7c5]' : 'bg-[#f42]') : 'bg-[#50647d]';

  return (
    <button
      type="button"
      className={`text-sm w-[108px] leading-10 text-white ${bg} text-center uppercase rounded-md border-[1.5px] text-shadow transition-all hover:scale-105 disabled:bg-[#3c4a5f] border-[rgb(0,0,0,.2)]`}
      {...props}
    >
      {children}
    </button>
  );
};
