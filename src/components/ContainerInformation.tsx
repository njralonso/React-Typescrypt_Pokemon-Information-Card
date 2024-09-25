import { useState } from "react"
import { useFetchPokemon } from "../hooks/useFetchPokemon"
import SearchPokemon from "./SearchPokemon"
import PokemonInformation from "./PokemonInformation"

function PokemonList({ pokemon, pokemonInfo, pokemonInfoTypes, loadMorePokemons, loadLessPokemons }) {

	// Ordena los pokemons a-z
	pokemonInfo.sort((a, b) => a.id - b.id)

	return (<div >
		<div className="inline-flex gap-24 justify-around flex-wrap p-4">
			{/* Lista de pokemons */}
			{pokemonInfo.map((pokemon, i) => (
				<div key={i} className="">
					<div className="">
						<div className="flex flex-col mx-auto">
							<h2>{pokemon.name}</h2>
							<img
								src={pokemon.sprites.front_default}
								alt="pokemon_image"
								className="scale-100 w-fit"
							/>
						</div>

						{/* Renderiza solo los tipos del Pokémon actual */}
						<div className="w-16 inline-flex justify-center gap-2">
							{pokemon.types.map((type, j) => (
								<img
									key={j}
									src={pokemonInfoTypes.find(
										(typeInfo) => typeInfo.name === type.type.name
									)?.sprites["generation-viii"]["sword-shield"].name_icon}
									alt={type.type.name}
									className="rounded-md"
								/>
							))}
						</div>
					</div>

				</div>
			))}
		</div>
		<button onClick={loadLessPokemons}>Show less Pokémon</button>
		<button onClick={loadMorePokemons}>Load more Pokémon</button>
	</div >)
}

function PokemonFiltered({ pokemonInfo, pokemonInfoTypes, value }) {
	const filteredPokemon = pokemonInfo.filter(pokemon => pokemon.name.includes(value))

	return (<div>
		{/* Pokemon filtrado */}
		{
			filteredPokemon.map((pokemon, i) => (
				<div key={i}>
					<div className="flex flex-col w-fit mx-auto">
						<h2>{pokemon.name}</h2>
						<img
							src={pokemon.sprites.front_default}
							alt="pokemon_image"
							className="scale-125 w-fit"
						/>
					</div>
					<div className="w-24 inline-flex justify-center gap-2">
						{pokemon.types.map((type, j) => (
							<img
								key={j}
								src={pokemonInfoTypes.find(
									(typeInfo) => typeInfo.name === type.type.name
								)?.sprites["generation-viii"]["sword-shield"].name_icon}
								alt={type.type.name}
								className="rounded-md"
							/>
						))}
					</div>
				</div>
			))
		}
	</div>)
}

export default function ContainerInformation() {
	const [value, setValue] = useState("")
	const { pokemon, pokemonInfo, pokemonInfoTypes, loadMorePokemons, loadLessPokemons, error } = useFetchPokemon()

	const handleOnChange = (e) => {
		setValue(e.target.value)
	}

	return (
		<div>
			<SearchPokemon value={value} handleOnChange={handleOnChange} />
			{!value ?
				<PokemonList pokemonInfo={pokemonInfo} pokemonInfoTypes={pokemonInfoTypes} loadMorePokemons={loadMorePokemons} loadLessPokemons={loadLessPokemons} />
				:
				<PokemonFiltered pokemonInfo={pokemonInfo} pokemonInfoTypes={pokemonInfoTypes} value={value} />
			}
		</div>
	)
}