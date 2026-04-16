import { WiHumidity, WiStrongWind, WiThermometer } from 'react-icons/wi'
import { IoClose } from 'react-icons/io5'

const Sidebar = ({ city, onClose }) => {
  if (!city) return null

  const getBgColor = (temp) => {
    if (temp >= 30) return 'linear-gradient(135deg, #e74c3c, #e67e22)'
    if (temp >= 20) return 'linear-gradient(135deg, #e67e22, #f39c12)'
    if (temp >= 15) return 'linear-gradient(135deg, #27ae60, #2ecc71)'
    return 'linear-gradient(135deg, #2980b9, #3498db)'
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '280px',
      height: '100vh',
      background: 'white',
      zIndex: 1000,
      boxShadow: '-4px 0 16px rgba(0,0,0,0.15)',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>

      {/* Header coloré selon température */}
      <div style={{
        background: getBgColor(city.temp),
        padding: '24px 20px',
        color: 'white',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.3)',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            cursor: 'pointer',
            color: 'white',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IoClose />
        </button>

        <h2 style={{ margin: '0 0 4px', fontSize: '22px' }}>{city.name}</h2>
        <p style={{ margin: 0, opacity: 0.85, fontSize: '14px', textTransform: 'capitalize' }}>
          {city.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
          <img
            src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
            alt={city.description}
            style={{ width: '60px' }}
          />
          <span style={{ fontSize: '48px', fontWeight: 'bold', marginLeft: '8px' }}>
            {city.temp}°C
          </span>
        </div>
      </div>

      {/* Détails météo */}
      <div style={{ padding: '20px', flex: 1 }}>

        <StatCard
          icon={<WiThermometer size={28} color="#e67e22" />}
          label="Ressenti"
          value={`${city.feelsLike}°C`}
        />
        <StatCard
          icon={<WiHumidity size={28} color="#3498db" />}
          label="Humidité"
          value={`${city.humidity}%`}
        />
        <StatCard
          icon={<WiStrongWind size={28} color="#7f8c8d" />}
          label="Vent"
          value={`${city.wind} m/s`}
        />
      </div>

      {/* Footer */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid #ecf0f1',
        fontSize: '11px',
        color: '#95a5a6',
        textAlign: 'center'
      }}>
        Source : OpenWeatherMap
      </div>
    </div>
  )
}

const StatCard = ({ icon, label, value }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '14px',
    marginBottom: '10px',
    background: '#f8f9fa',
    borderRadius: '10px',
  }}>
    {icon}
    <div style={{ marginLeft: '12px' }}>
      <p style={{ margin: 0, fontSize: '12px', color: '#7f8c8d' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>{value}</p>
    </div>
  </div>
)

export default Sidebar