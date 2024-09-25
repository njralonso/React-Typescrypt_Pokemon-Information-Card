export default function SearchPokemon({ value, handleOnChange }) {

	return (<div>
		<input type="text" value={value} onChange={handleOnChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
	</div>)
}