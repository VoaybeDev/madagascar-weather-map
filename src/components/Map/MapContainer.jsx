import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import RegionLayer from './RegionLayer'

const MadagascarMap = () => {
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
      <RegionLayer />
    </MapContainer>
  )
}

export default MadagascarMap