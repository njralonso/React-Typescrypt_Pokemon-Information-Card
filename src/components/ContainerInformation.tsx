import useFetchPokemon from "../hooks/useFetchPokemon"

function FilterPokemon() {
	return (<>
		<input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
	</>)
}

export default function ContainerInformation() {
	const { pokemon, showNextPokemons, showPrevPokemons } = useFetchPokemon()

	return (<>
		<FilterPokemon />
		{pokemon.map((poke, i) => (
			<p key={i}>{poke.name}</p>
		))}
		<button onClick={showPrevPokemons}>Go Prev</button>
		<button onClick={showNextPokemons}>Go next</button>
	</>)
}