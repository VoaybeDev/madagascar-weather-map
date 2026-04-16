// Retourne une couleur selon la température
export const getColorByTemp = (temp) => {
  if (temp === null || temp === undefined) return '#cccccc'
  if (temp >= 35) return '#b30000'
  if (temp >= 30) return '#e34a33'
  if (temp >= 25) return '#fc8d59'
  if (temp >= 20) return '#fdcc8a'
  if (temp >= 15) return '#a1d99b'
  if (temp >= 10) return '#31a354'
  return '#006837'
}