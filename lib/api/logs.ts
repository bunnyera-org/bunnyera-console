
export async function getLogs() {
  const res = await fetch(
    'https://bunnyera-cloud-backend-production.up.railway.app/logs'
  )
  return res.json()
}
