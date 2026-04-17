import { useState, useEffect } from 'react'
import { getWeatherByCoords } from '../services/weatherAPI'
import CITIES from '../constants/cities'

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchAllCities = async () => {
    try {
      const promises = CITIES.map(city =>
        getWeatherByCoords(city.lat, city.lon)
          .then(data => ({
            ...city,
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            wind: data.wind.speed
          }))
      )
      const results = await Promise.all(promises)
      setWeatherData(results)
      setLastUpdate(new Date().toLocaleTimeString('fr-FR'))
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement météo')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllCities()

    // Rafraîchit toutes les 10 minutes
    const interval = setInterval(fetchAllCities, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { weatherData, loading, error, lastUpdate }
}

export default useWeatherData