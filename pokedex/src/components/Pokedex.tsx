import { useEffect, useCallback, useState } from "react"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import pokedexLogo from "../images/pokedex-logo.png"
import Pagination from "@mui/material/Pagination"
import axios from "axios"
import { Autocomplete, TextField } from "@mui/material"
import { PokemonList } from "./PokemonList"
import { SearchList } from "../SearchList"
 

const theme = createTheme()

export interface PokemonResourceResults {
  name: string,
  url: string
}
export interface PokemonResource {
  count: number
  next: string | null
  previous: string | null
  results: PokemonResourceResults[]
}

export const Pokedex = (props:any) => {
  let {navigate} = props;

  const [pokemon, setPokemon] = useState<PokemonResource>()
  const [searchTerm, setSearchTerm] = useState<string>("")


  // Query list of pokemon
  const getPokemon = useCallback(
    async (URL: string) => {
      const response = await axios.get(URL, {})
      setPokemon(response.data)
    },
    []
  )

  // For pagination - switch pages
  const switchPage = (e: React.ChangeEvent<unknown>, page: number) => {
    const offset = (page - 1) * 20
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
    getPokemon(url)
  }

  const handleSearch = (event: React.SyntheticEvent, value:any) => {
    setSearchTerm(value);
  }

  useEffect(() => {
    // first time query
    const URL = "https://pokeapi.co/api/v2/pokemon/"
    getPokemon(URL)
  }, [getPokemon])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <img src={pokedexLogo} alt="pokedex logo" style={{ height: 30 }} />
        </Toolbar>
      </AppBar>
      <main>
   
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
     
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome to the Pokedex!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              The Pokédex has a wealth of information on all the Pokémon
              creatures from the entire game series. On the main list pages you
              can see the various stats of each Pokémon. Click or Search a Pokémon's name
              to see a detailed page with Pokédex data, abilities and moves!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
               

              <Autocomplete 
              id="pokedex-search"  
              sx={{width:300}} 
              options={SearchList?.results.map((poke)=> poke.name)}  
              autoSelect
              onChange={handleSearch}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="PokeDex Search"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
              />
              <Button variant="contained" onClick={()=>navigate(`/pokedex/${searchTerm}`)}>Search</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
      
          <Grid container spacing={2} justifyContent="center">
            <PokemonList pokemon={pokemon?.results} navigate={navigate} />
            <Pagination count={57} color="primary" onChange={switchPage} />
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  )
}
export default Pokedex
