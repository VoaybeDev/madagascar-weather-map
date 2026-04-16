import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

const WeatherMarker = ({ city }) => {
  const { name, lat, lon, temp, description, humidity, wind, icon, feelsLike } = city

  // Icône personnalisée avec la température
  const tempIcon = L.divIcon({
    className: 'weather-icon',
    html: `
      <div style="
        background: ${temp > 30 ? '#e74c3c' : temp > 20 ? '#e67e22' : '#3498db'};
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-weight: bold;
        font-size: 13px;
        white-space: nowrap;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">${temp}°C</div>
    `,
    iconAnchor: [20, 10]
  })

  return (
    <Marker position={[lat, lon]} icon={tempIcon}>
      <Popup>
        <div style={{ minWidth: '160px', fontFamily: 'sans-serif' }}>
          <h3 style={{ margin: '0 0 8px', color: '#2c3e50' }}>{name}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            style={{ width: 50 }}
          />
          <p style={{ margin: '4px 0', textTransform: 'capitalize' }}>{description}</p>
          <hr style={{ margin: '6px 0' }} />
          <p style={{ margin: '4px 0' }}>🌡️ <b>{temp}°C</b> (ressenti {feelsLike}°C)</p>
          <p style={{ margin: '4px 0' }}>💧 Humidité : <b>{humidity}%</b></p>
          <p style={{ margin: '4px 0' }}>💨 Vent : <b>{wind} m/s</b></p>
        </div>
      </Popup>
    </Marker>
  )
}

export default WeatherMarker