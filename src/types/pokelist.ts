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
  id: string;
  types: Types[];
  sprites: Sprites;
};

export type Sprites = {
  front_default: string;
  other: OfficialArtwork;
};

export type OfficialArtwork = {
  "official-artwork": Artwork;
};

export type Artwork = {
  front_default: string;
  front_shiny: string;
};

export type Types = {
  slot: number;
  type: test;
};

export type test = {
  name: string;
  url: string;
};

export type PokeDetailResult = {
  id: number;
  name: string;
  species: string;
  height: number;
  weight: number;
  types: Types[];
  stats: Stats[];
  sprites: Sprites;
  abilities: PokeDetailAbility[];
  moves: PokeMovesDetail[];
};

export type Stats = {
  base_stat: number;
  effor: number;
  stat: DetailAttribute;
};

export type PokeDetailAbility = {
  ability: DetailAttribute;
};

export type DetailAttribute = {
  name: string;
  url: string;
};

export type PokeSpecies = {
  genera: PokeSpeciesDetail[];
};

export type PokeSpeciesDetail = {
  genus: string;
  language: DetailAttribute;
};

export type PokeMoves = {
  moves: PokeMovesDetail[];
};

export type PokeMovesDetail = {
  move: DetailAttribute;
  version_group_details: VersionDetail[];
};

export type VersionDetail = {
  level_learned_at: number;
};
