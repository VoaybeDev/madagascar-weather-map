import { useEffect, useState } from 'react'
import { GeoJSON } from 'react-leaflet'

const RegionLayer = () => {
  const [geoData, setGeoData] = useState(null)

  useEffect(() => {
    fetch('/data/madagascar_regions.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error('Erreur GeoJSON:', err))
  }, [])

  const style = {
    fillColor: '#2d8a4e',
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.4
  }

  const onEachRegion = (feature, layer) => {
    const name = feature.properties.NAME_2 || feature.properties.name || 'Région'
    layer.bindTooltip(name, { permanent: false, direction: 'center' })
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({ fillOpacity: 0.8, fillColor: '#1a5c33' })
      },
      mouseout: (e) => {
        e.target.setStyle({ fillOpacity: 0.4, fillColor: '#2d8a4e' })
      }
    })
  }

  if (!geoData) return null

  return <GeoJSON data={geoData} style={style} onEachFeature={onEachRegion} />
}

export default RegionLayer