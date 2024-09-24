import { useEffect } from "react";
import { useFetchPokemon } from "../hooks/useFetchPokemon"

export default function SearchPokemon({ pokemon, handleOnChange }) {
	const { data, pokemonInfo, error } = useFetchPokemon(pokemon)


	return (<div>
		<input type="text" value={pokemon} onChange={handleOnChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
	</div>)
}