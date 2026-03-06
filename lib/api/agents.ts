
export async function getAgents() {
  const res = await fetch(
    'https://bunnyera-cloud-backend-production.up.railway.app/agents'
  )
  return res.json()
}
