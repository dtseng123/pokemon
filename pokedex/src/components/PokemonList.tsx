import React from "react"
import {
  Chip,
  Grid,
} from "@mui/material"
 import { PokemonResourceResults } from "./Pokedex"
import { NavigateFunction } from "react-router-dom"

interface PokemonListProps {
  navigate: NavigateFunction
  pokemon: PokemonResourceResults[] | undefined
  
}

export const PokemonList = (props: PokemonListProps) => {

  const clickPokemon = (name:string) => {
    props.navigate(`/pokedex/${name}` )
  }

  const { pokemon } = props

  return (
    <Grid item>
      {pokemon &&
        pokemon.map((poke, index) => (
          <Chip key={index} label={poke.name} variant="outlined" sx={{margin:3}} onClick={()=>clickPokemon(poke.name)} />
        ))}
    </Grid>
  )
}
