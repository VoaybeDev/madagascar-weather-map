const Header = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'rgba(255,255,255,0.95)',
      padding: '10px 24px',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      whiteSpace: 'nowrap'
    }}>
      <h1 style={{ margin: 0, fontSize: '18px', color: '#2c3e50' }}>
        🌍 Carte Météo Madagascar
      </h1>
      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#7f8c8d' }}>
        Données en temps réel — OpenWeatherMap
      </p>
    </div>
  )
}

export default Header