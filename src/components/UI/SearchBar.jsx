import { useState } from 'react'
import { IoSearch, IoClose } from 'react-icons/io5'

const SearchBar = ({ weatherData, onSelect }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.length < 2) {
      setResults([])
      return
    }

    const filtered = weatherData.filter(city =>
      city.name.toLowerCase().includes(value.toLowerCase())
    )
    setResults(filtered)
  }

  const handleSelect = (city) => {
    onSelect(city)
    setQuery('')
    setResults([])
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
  }

  return (
    <div style={{
      position: 'absolute',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      width: '280px',
      fontFamily: 'sans-serif'
    }}>
      {/* Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'white',
        borderRadius: results.length > 0 ? '12px 12px 0 0' : '12px',
        padding: '10px 14px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        gap: '8px'
      }}>
        <IoSearch size={18} color="#7f8c8d" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Rechercher une ville..."
          style={{
            border: 'none',
            outline: 'none',
            flex: 1,
            fontSize: '14px',
            color: '#2c3e50',
            background: 'transparent'
          }}
        />
        {query && (
          <IoClose
            size={18}
            color="#7f8c8d"
            style={{ cursor: 'pointer' }}
            onClick={handleClear}
          />
        )}
      </div>

      {/* Résultats */}
      {results.length > 0 && (
        <div style={{
          background: 'white',
          borderRadius: '0 0 12px 12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          borderTop: '1px solid #ecf0f1'
        }}>
          {results.map(city => (
            <div
              key={city.name}
              onClick={() => handleSelect(city)}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
              onMouseLeave={e => e.currentTarget.style.background = 'white'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={`https://openweathermap.org/img/wn/${city.icon}.png`}
                  alt={city.description}
                  style={{ width: '28px' }}
                />
                <span style={{ fontSize: '14px', color: '#2c3e50' }}>{city.name}</span>
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: city.temp > 30 ? '#e74c3c' : city.temp > 20 ? '#e67e22' : '#3498db'
              }}>
                {city.temp}°C
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Aucun résultat */}
      {query.length >= 2 && results.length === 0 && (
        <div style={{
          background: 'white',
          borderRadius: '0 0 12px 12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          padding: '12px 14px',
          fontSize: '13px',
          color: '#7f8c8d',
          textAlign: 'center',
          borderTop: '1px solid #ecf0f1'
        }}>
          Aucune ville trouvée
        </div>
      )}
    </div>
  )
}

export default SearchBar