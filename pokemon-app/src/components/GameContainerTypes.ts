interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface SinglePokemon {
  abilities: PokemonAbility[];
  id: number;
  name: string;
  spriteFront: string;
  spriteBack: string;
  types: PokemonType[];
}
