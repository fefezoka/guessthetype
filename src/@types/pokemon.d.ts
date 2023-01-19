interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      ['official-artwork']: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: Type;
    };
  }[];
}

type Type =
  | 'fire'
  | 'grass'
  | 'water'
  | 'bug'
  | 'normal'
  | 'poison'
  | 'ghost'
  | 'rock'
  | 'electric'
  | 'fighting'
  | 'flying'
  | 'steel'
  | 'dragon'
  | 'psychic'
  | 'dark'
  | 'ground'
  | 'ice'
  | 'fairy'
  | 'unknown';
