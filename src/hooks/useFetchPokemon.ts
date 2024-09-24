import { useEffect, useState } from "react"

const url = "https://pokeapi.co/api/v2/pokemon"

export function useFetchPokemon() {
	const [pokemon, setPokemon] = useState()
	const [pokemonInfo, setPokemonInfo] = useState([])
	const [pokemonInfoTypes, setPokemonInfoTypes] = useState([])
	const [error, setError] = useState()

	// Fetch de la información principal
	useEffect(() => {
		const request = async () => {
			try {
				const response = await fetch(url)
				if (response.ok) {
					const data = await response.json()
					setPokemon(data)

					// Fetch de los detalles de cada Pokémon
					const { results } = data
					const arrPokemonDetails = []
					const pokemonDetails = await Promise.all(
						results.map(async (pokemon) => {
							const response2 = await fetch(pokemon.url)
							if (response2.ok) {
								const data2 = await response2.json()
								arrPokemonDetails.push(data2)
							}
						})
					)
					setPokemonInfo(arrPokemonDetails)
				}
			} catch (error) {
				// setError("Error en la primera llamada")
			}
		}

		request()
	}, [])

	// Fetch de los tipos cuando pokemonInfo esté disponible
	useEffect(() => {
		if (pokemonInfo.length > 0) {
			const fetchTypes = async () => {
				try {
					const arrTypes = []

					const pokemonTypes = await Promise.all(
						pokemonInfo.map((itemType) => itemType.types)
					)

					const arrTypeUrls = []
					pokemonTypes.forEach((types) => {
						types.forEach((type) => {
							arrTypeUrls.push(type.type.url)
						})
					})

					const arrPokemonTypes = await Promise.all(
						arrTypeUrls.map(async (url) => {
							const response3 = await fetch(url)
							if (response3.ok) {
								const data3 = await response3.json()
								return data3
							}
						})
					)

					setPokemonInfoTypes(arrPokemonTypes.filter(Boolean))
				} catch (error) {
					// setError("Error al obtener los tipos de Pokémon")
				}
			}

			fetchTypes()
		}
	}, [pokemonInfo]) // Dependencia en pokemonInfo

	return { pokemon, pokemonInfo, pokemonInfoTypes, error }
}
