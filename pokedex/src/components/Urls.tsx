import { Route, Routes, Navigate } from "react-router-dom"
import Pokedex from "./Pokedex"
import PokemonDetails from "./PokemonDetails"
import { useNavigate } from "react-router-dom"

const Urls = (props: any) => {
  let navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/pokedex" /> } />
      <Route path="/pokedex" element={<Pokedex navigate={navigate} />} />
      <Route path="/pokedex/:pokemon" element={<PokemonDetails/>} />
    </Routes>
  )
}

export default Urls
