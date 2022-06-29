import React, { useEffect, useCallback, useState } from "react"
import {
  AppBar,
  Button,
  Card,
  Chip,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import pokedexLogo from "../images/pokedex-logo.png"
import axios from "axios"

export const PokemonCard = () => {
  const [details, setDetails] = useState<any>()
  // get the pokemon name from url slug
  let { pokemon } = useParams()
  const navigate = useNavigate()
  const getPokemonDetails = useCallback(
    async (URL: string) => {
      const response = await axios.get(URL, {})
      setDetails(response.data)
    },
    []
  )

  useEffect(() => {
    if (pokemon) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      getPokemonDetails(url)
    }
  }, [getPokemonDetails, pokemon])
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <img src={pokedexLogo} alt="pokedex logo" style={{ height: 30 }} />
        </Toolbar>
      </AppBar>

      <Container>
        <Grid item xs={12} sm={6} md={2} sx={{ marginTop: 20 }}>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: 500,
                justifyContent: "center",
              }}
            >
              <Typography gutterBottom variant="h4" component="h2"id="pokemon-name">
                {pokemon}
              </Typography>
              {details?.sprites &&
                details.sprites.other["official-artwork"].front_default && (
                  <CardMedia
                    component="img"
                    width="auto"
                    image={
                      details.sprites.other["official-artwork"].front_default
                    }
                    alt={pokemon}
                  />
                )}
              <CardActions>
                <Button size="small" onClick={() => navigate("/pokedex")}>
                  back
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: 500,
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">Description</Typography>
                <Typography>
                  This pokemon is a{" "}
                  {details?.types &&
                    details?.types.map(
                      (typ: any, idx: number) => typ["type"].name + " "
                    )}
                  type with a height of {details?.height && details.height / 10}
                  m. and a weight of {details?.weight && details.weight / 10}kg.
                </Typography>
              </CardContent>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">Abilities</Typography>
                <Grid item>
                  {details?.abilities.map((ability: any, index: number) => (
                    <Chip
                      key={index}
                      label={ability.ability.name}
                      variant="outlined"
                      id={ `${ability.ability.name}-${index}`}
                    />
                  ))}
                </Grid>
              </CardContent>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">Moves</Typography>
                <Grid item>
                  {details?.moves.map((move: any, index: number) => (
                    <Chip
                      key={index}
                      label={move.move.name}
                      variant="outlined"
                      id={ `${move.move.name}-${index}`}
                    />
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Container>
    </>
  )
}
export default PokemonCard
