import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pokemonType: { name: Type; color: string };
  active?: boolean;
}

export const TypeIcon = ({ pokemonType, active, ...props }: Props) => {
  const border = active
    ? 'border-[3px] border-orange-400'
    : 'border-[1.5px] border-[rgb(0,0,0,.2)]';

  return (
    <button
      type="button"
      className={`text-sm w-[92px] leading-9 text-white ${border} ${pokemonType.color} text-center uppercase rounded-md text-shadow transition-all duration-300 hover:-translate-y-[15%]`}
      {...props}
    >
      {pokemonType.name}
    </button>
  );
};
