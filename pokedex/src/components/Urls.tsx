import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Pokedex from "./Pokedex"
import PokemonDetails from "./PokemonDetails"

const Urls = (props: any) => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Navigate to="/pokedex" /> } />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:pokemon" element={<PokemonDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Urls
