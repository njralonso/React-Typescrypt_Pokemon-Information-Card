
export default function PokemonInformation({ information, pokemonInfo }) {
	return (<div>
		{information &&
			<div>
				{information.results.map((pokemon, i) => (
					<p className="text-2xl bg-red-200" key={i}>{pokemon.name}</p>
				))}
			</div>
		}
	</div>)
}