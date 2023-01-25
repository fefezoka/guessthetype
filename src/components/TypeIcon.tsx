import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pokemonType: { name: Type; color: string };
  active?: boolean;
}

export const TypeIcon = ({ pokemonType, active, ...props }: Props) => {
  const borderColor = active
    ? 'border-orange-400 shadow-[0_0_0_2px_rgb(251,146,60)]'
    : 'border-[rgb(0,0,0,.5)]';

  return (
    <button
      type="button"
      className={`text-sm w-[92px] leading-9 text-white border-[1.5px] ${borderColor} ${pokemonType.color} text-center uppercase rounded-md text-shadow transition-all duration-300 hover:-translate-y-[15%]`}
      {...props}
    >
      {pokemonType.name}
    </button>
  );
};
