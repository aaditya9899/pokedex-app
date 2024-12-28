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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full p-2 border rounded text-gray-900 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="w-full p-2 border rounded text-gray-900 bg-white"
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

      {/* Pokemon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white text-gray-900"
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
                className="w-32 h-32 mx-auto hover:scale-110 transition-transform"
              />
            </div>
            <h2 className="text-center text-lg capitalize font-bold mt-2">
              {p.name}
            </h2>
            <div className="flex justify-center gap-2 mt-2">
              {p.types.map((type) => (
                <span
                  key={type.type.name}
                  className="px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-900"
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
      <div className="flex justify-center gap-4 mt-6 mb-8">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 hover:bg-red-700 transition-colors"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}