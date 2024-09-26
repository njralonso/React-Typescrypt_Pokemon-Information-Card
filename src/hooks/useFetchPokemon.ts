import { useEffect, useState } from "react"

const URL = "https://pokeapi.co/api/v2/pokemon/"

export default function useFetchPokemon() {
	const [pokemon, setPokemon] = useState([])
	const [offset, setOffset] = useState(0)

	useEffect(() => {
		const fetchPokemon = async () => {
			const responsePokemon = await fetch(`${URL}?limit=10&offset=${offset}`)
			if (responsePokemon.ok) {
				const responsePokemonNames = await responsePokemon.json()
				setPokemon((prev) => [...prev, ...responsePokemonNames.results].slice(-10))
			}
		}
		fetchPokemon()
	}, [offset])

	const showNextPokemons = () => {
		setOffset((pokemon) => pokemon + 10)
		console.log(pokemon, "hook")
		console.log(offset, "hook")
	}
	const showPrevPokemons = () => {
		setOffset((pokemon) => pokemon - 10)
		// setPokemon((prev)=> [...])
		console.log(pokemon, "hook")
		console.log(offset, "hook")
	}

	return { pokemon, showNextPokemons, showPrevPokemons }
}

