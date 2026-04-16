import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import RegionLayer from './RegionLayer'
import WeatherMarker from './WeatherMarker'
import useWeatherData from '../../hooks/useWeatherData'
import Legend from '../UI/Legend'

const MadagascarMap = () => {
  const { weatherData, loading, error } = useWeatherData()

  return (
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
        <WeatherMarker key={city.name} city={city} />
      ))}
      <Legend />
    </MapContainer>
  )
}

export default MadagascarMap