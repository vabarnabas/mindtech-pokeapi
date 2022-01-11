export interface PokeTypes {
    name: string
    url: string
  }
  
export interface Pokemon {
    pokemon: {
        name: string
        url: string
    }
    slot: number
  }

  export interface Abilities {
    ability: {
        name: string
        url: string
    }
    is_hidden: boolean
    slot: number
}

export interface PokeData {
    name: string
    weight: number
    height: number
    id: number
    sprites: {
        back_default: string
        back_shiny: string
        front_default: string
        front_shiny: string
    }
    abilities: Abilities[]
}

export interface menuItem {
    name: string
    url?: string
}