import { getColorByTemp } from '../../utils/colorScale'

const ranges = [
  { label: '≥ 35°C', temp: 35 },
  { label: '30 - 34°C', temp: 30 },
  { label: '25 - 29°C', temp: 25 },
  { label: '20 - 24°C', temp: 20 },
  { label: '15 - 19°C', temp: 15 },
  { label: '10 - 14°C', temp: 10 },
  { label: '< 10°C', temp: 5 },
]

const Legend = () => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '30px',
      right: '10px',
      zIndex: 1000,
      background: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      fontFamily: 'sans-serif',
      fontSize: '13px'
    }}>
      <b style={{ display: 'block', marginBottom: '8px' }}>🌡️ Température</b>
      {ranges.map(r => (
        <div key={r.temp} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <div style={{
            width: '18px',
            height: '18px',
            borderRadius: '3px',
            background: getColorByTemp(r.temp),
            marginRight: '8px'
          }} />
          {r.label}
        </div>
      ))}
    </div>
  )
}

export default Legend