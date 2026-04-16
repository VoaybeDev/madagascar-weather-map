import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import RegionLayer from './RegionLayer'
import WeatherMarker from './WeatherMarker'
import useWeatherData from '../../hooks/useWeatherData'
import Legend from '../UI/Legend'
import Header from '../Layout/Header'
import LoadingSpinner from '../UI/LoadingSpinner'
import Sidebar from '../Layout/Sidebar'

const MadagascarMap = () => {
  const { weatherData, loading, error } = useWeatherData()
  const [selectedCity, setSelectedCity] = useState(null)

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Header />
      {loading && <LoadingSpinner />}
      {error && (
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: '#e74c3c',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontFamily: 'sans-serif',
          fontSize: '14px'
        }}>
          ⚠️ {error}
        </div>
      )}
      <MapContainer
        center={[-18.9249, 47.5185]}
        zoom={6}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        <RegionLayer weatherData={weatherData} />
        {!loading && !error && weatherData.map(city => (
          <WeatherMarker
            key={city.name}
            city={city}
            onSelect={setSelectedCity}
          />
        ))}
      </MapContainer>
      <Legend />
      <Sidebar
        city={selectedCity}
        onClose={() => setSelectedCity(null)}
      />
    </div>
  )
}

export default MadagascarMap