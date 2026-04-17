const Header = ({ lastUpdate }) => {
  return (
    <>
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
          {lastUpdate ? `Mis à jour à ${lastUpdate}` : 'Données en temps réel — OpenWeatherMap'}
        </p>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        fontFamily: 'sans-serif',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.9)',
        background: 'rgba(44,62,80,0.7)',
        padding: '6px 14px',
        borderRadius: '20px',
        whiteSpace: 'nowrap',
        backdropFilter: 'blur(4px)'
      }}>
        Crafted by <a href="https://voaybedev.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', fontWeight: 'bold', textDecoration: 'none' }}>Voaybe</a>
      </div>
    </>
  )
}

export default Header