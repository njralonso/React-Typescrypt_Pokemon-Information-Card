import { useState } from "react"
import { useFetchPokemon } from "../hooks/useFetchPokemon"


export default function ContainerInformation() {
	const { pokemon, pokemonInfo, pokemonInfoTypes, error } = useFetchPokemon()
	console.log(pokemonInfo)
	console.log(pokemonInfoTypes)
	pokemonInfo.sort((a, b) => a.id - b.id)
	pokemonInfoTypes.sort((a, b) => a.name - b.name)

	return (
		<div>
			{pokemonInfo.map((pokemon, i) => (
				<div key={i}>
					<div className="flex flex-col w-fit mx-auto">
						<h2>{pokemon.name}</h2>
						<img
							src={pokemon.sprites.front_default}
							alt="pokemon_image"
							className="scale-125 w-fit"
						/>
					</div>

					{/* Renderiza solo los tipos del Pokémon actual */}
					<div className="w-32 inline-flex justify-center">
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
			))}
		</div>
	)
}