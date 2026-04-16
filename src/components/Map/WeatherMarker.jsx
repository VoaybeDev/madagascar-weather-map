import { Marker } from 'react-leaflet'
import L from 'leaflet'

const WeatherMarker = ({ city, onSelect }) => {
  const { name, lat, lon, temp } = city

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
        cursor: pointer;
      ">${temp}°C</div>
    `,
    iconAnchor: [20, 10]
  })

  return (
    <Marker
      position={[lat, lon]}
      icon={tempIcon}
      eventHandlers={{ click: () => onSelect(city) }}
    />
  )
}

export default WeatherMarker