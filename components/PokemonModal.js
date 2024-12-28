export default function PokemonModal({ pokemon, onClose }) {
    if (!pokemon) return null
  
    return (
      <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl transform transition-all animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h2>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-48 h-48 group-hover:scale-110 transition-transform"
                />
                {pokemon.sprites.back_default && (
                  <img
                    src={pokemon.sprites.back_default}
                    alt={`${pokemon.name} back view`}
                    className="w-48 h-48 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </div>
              
              <div className="text-center mt-4">
                <span className="text-sm text-gray-500">#{pokemon.id}</span>
                <p className="text-sm text-gray-600 mt-1">
                  Height: {pokemon.height/10}m | Weight: {pokemon.weight/10}kg
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3">Base Stats</h3>
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="capitalize text-sm text-gray-600">
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <span className="text-sm font-medium">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 rounded-full h-2 transition-all duration-500 ease-out"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium capitalize hover:bg-gray-200 transition-colors"
                    >
                      {ability.ability.name.replace('-', ' ')}
                      {ability.is_hidden && 
                        <span className="text-xs text-gray-500 ml-1">(Hidden)</span>
                      }
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }