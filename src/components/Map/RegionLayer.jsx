import { useEffect, useState } from 'react'
import { GeoJSON } from 'react-leaflet'
import { getColorByTemp } from '../../utils/colorScale'

// Calcule la distance entre deux points (formule simple)
const getDistance = (lat1, lon1, lat2, lon2) => {
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2))
}

// Centre approximatif de chaque région (lat, lon)
const getCentroid = (feature) => {
  const coords = feature.geometry.coordinates
  try {
    // Prend le premier anneau du premier polygone
    const ring = feature.geometry.type === 'MultiPolygon'
      ? coords[0][0]
      : coords[0]

    const lats = ring.map(c => c[1])
    const lons = ring.map(c => c[0])
    const lat = lats.reduce((a, b) => a + b, 0) / lats.length
    const lon = lons.reduce((a, b) => a + b, 0) / lons.length
    return { lat, lon }
  } catch {
    return null
  }
}

const RegionLayer = ({ weatherData }) => {
  const [geoData, setGeoData] = useState(null)

  useEffect(() => {
    fetch('/data/madagascar_regions.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error('Erreur GeoJSON:', err))
  }, [])

  // Trouve la ville météo la plus proche du centroïde de la région
  const getNearestCity = (feature) => {
    if (!weatherData || weatherData.length === 0) return null
    const centroid = getCentroid(feature)
    if (!centroid) return null

    let nearest = null
    let minDist = Infinity

    weatherData.forEach(city => {
      const dist = getDistance(centroid.lat, centroid.lon, city.lat, city.lon)
      if (dist < minDist) {
        minDist = dist
        nearest = city
      }
    })

    return nearest
  }

  const styleRegion = (feature) => {
    const city = getNearestCity(feature)
    return {
      fillColor: city ? getColorByTemp(city.temp) : '#cccccc',
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.6
    }
  }

  const onEachRegion = (feature, layer) => {
    const name = feature.properties.NAME_2 || feature.properties.name || 'Région'
    const city = getNearestCity(feature)
    const tempText = city ? `${city.temp}°C (${city.name})` : 'Données indisponibles'

    layer.bindTooltip(
      `<b>${name}</b><br/>🌡️ ${tempText}`,
      { permanent: false, direction: 'center' }
    )

    layer.on({
      mouseover: (e) => e.target.setStyle({ fillOpacity: 0.9, weight: 2 }),
      mouseout: (e) => e.target.setStyle({ fillOpacity: 0.6, weight: 1 })
    })
  }

  if (!geoData) return null

  return (
    <GeoJSON
      key={JSON.stringify(weatherData)}
      data={geoData}
      style={styleRegion}
      onEachFeature={onEachRegion}
    />
  )
}

export default RegionLayer