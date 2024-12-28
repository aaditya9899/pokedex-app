export default function PokemonModal({ pokemon, onClose }) {
    if (!pokemon) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-48 h-48"
            />
            
            <div className="mt-4 w-full">
              <h3 className="font-bold mb-2">Stats:</h3>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="capitalize">{stat.stat.name}:</span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 rounded-full h-2"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="mt-4 w-full">
              <h3 className="font-bold mb-2">Abilities:</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }