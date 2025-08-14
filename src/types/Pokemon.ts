import { NamedAPIResource } from "./NamedAPIResource"; '../namedAPIResource';

export interface Ability {
  ability: NamedAPIResource | null; // null possible in past_abilities
  is_hidden: boolean;
  slot: number;
}

export interface PokemonCries {
  latest: string;
  legacy: string;
}

export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface ItemVersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

export interface HeldItem {
  item: NamedAPIResource;
  version_details: ItemVersionDetail[];
}

export interface MoveVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  order: number | null;
  version_group: NamedAPIResource;
}

export interface Move {
  move: NamedAPIResource;
  version_group_details: MoveVersionGroupDetail[];
}

export interface PastAbility {
  abilities: Ability[];
  generation: NamedAPIResource;
}

export interface DreamWorldSprite {
  front_default: string;
  front_female: string | null;
}

export interface HomeSprite {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface OfficialArtworkSprite {
  front_default: string;
  front_shiny: string;
}

export interface ShowdownSprite {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface OtherSprites {
  dream_world: DreamWorldSprite;
  home: HomeSprite;
  "official-artwork": OfficialArtworkSprite;
  showdown: ShowdownSprite;
}

export interface Sprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: OtherSprites;
  versions: Record<string, any>; // you can type each generation/version if needed
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface TypeSlot {
  slot: number;
  type: NamedAPIResource;
}

export interface Pokemon {
  // abilities: Ability[];
  // base_experience: number;
  // cries: PokemonCries;
  // forms: NamedAPIResource[];
  // game_indices: VersionGameIndex[];
  // height: number;
  // held_items: HeldItem[];
  // id: number;
  // is_default: boolean;
  location_area_encounters: string;
  // moves: Move[];
  name: string;
  // order: number;
  // past_abilities: PastAbility[];
  // past_types: any[]; // define if needed
  // species: NamedAPIResource;
  // sprites: Sprites;
  stats: Stat[];
  // types: TypeSlot[];
  // weight: number;
}