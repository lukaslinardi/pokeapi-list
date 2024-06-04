export type Res = {
  pageParams: number[];
  pages: PokeListResult[];
};

export type PokeListResult = {
  count: number;
  next: string;
  previous: string;
  results: Result[];
};

export type Result = {
  name: string;
  url: string;
  buffer: PokemonType;
};

export type PokemonType = {
  types: Types[];
  sprites: Sprites;
};

export type Sprites = {
  front_default: string;
};

export type Types = {
  slot: number;
  type: test;
};

export type test = {
  name: string;
  url: string;
};
