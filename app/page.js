'use client'
import { useState, useEffect } from 'react'
import PokemonModal from '@/components/PokemonModal'

export default function Home() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [favorites, setFavorites] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('pokemonFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Fetch pokemon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true)
        const offset = (currentPage - 1) * 20
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
        )
        const data = await response.json()

        // Fetch detailed data for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            return res.json()
          })
        )
        
        setPokemon(pokemonDetails)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch Pokemon')
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [currentPage])

  const toggleFavorite = (pokemon) => {
    const newFavorites = favorites.includes(pokemon.id)
      ? favorites.filter(id => id !== pokemon.id)
      : [...favorites, pokemon.id]
    
    setFavorites(newFavorites)
    localStorage.setItem('pokemonFavorites', JSON.stringify(newFavorites))
  }

  // Filter pokemon based on search and type
  const filteredPokemon = pokemon.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType 
      ? p.types.some(t => t.type.name === selectedType)
      : true
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-8 px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">
            Welcome to the Pokédex
          </h1>
          <p className="text-center text-lg max-w-2xl mx-auto">
            Explore the wonderful world of Pokémon! Browse through different species, 
            save your favorites, and learn more about each unique creature.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
          <div>
            <span className="text-gray-600">Total Pokémon: </span>
            <span className="font-bold">{pokemon.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Favorites: </span>
            <span className="font-bold">{favorites.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Page: </span>
            <span className="font-bold">{currentPage}</span>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search Pokémon..."
              className="w-full p-3 border rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select
              className="w-full p-3 border rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="grass">Grass</option>
              <option value="electric">Electric</option>
              <option value="psychic">Psychic</option>
              <option value="ice">Ice</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="fairy">Fairy</option>
              <option value="normal">Normal</option>
              <option value="fighting">Fighting</option>
              <option value="flying">Flying</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="rock">Rock</option>
              <option value="bug">Bug</option>
              <option value="ghost">Ghost</option>
              <option value="steel">Steel</option>
            </select>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          </div>
        )}
        
        {error && (
          <div className="text-red-500 text-center py-10">
            {error}
          </div>
        )}

        {!loading && !error && filteredPokemon.length === 0 && (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 text-lg mb-2">No Pokémon found with the selected filters</p>
            <p className="text-gray-500">Try changing your search terms or type filter, or navigate to a different page</p>
          </div>
        )}

        {/* Pokemon Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemon.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer bg-white group"
              onClick={() => setSelectedPokemon(p)}
            >
              <div className="relative">
                <button
                  className="absolute top-0 right-0 p-2 hover:scale-110 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(p)
                  }}
                >
                  {favorites.includes(p.id) ? '❤️' : '🤍'}
                </button>
                <img
                  src={p.sprites.front_default}
                  alt={p.name}
                  className="w-40 h-40 mx-auto group-hover:scale-110 transition-transform"
                />
              </div>
              <h2 className="text-center text-xl capitalize font-bold mt-2">
                {p.name}
              </h2>
              <div className="flex justify-center gap-2 mt-3">
                {p.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedPokemon && (
          <PokemonModal
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8 mb-12">
          <button
            className="px-6 py-3 bg-red-600 text-white rounded-lg disabled:opacity-50 hover:bg-red-700 transition-colors font-medium"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}