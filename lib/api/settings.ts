
export async function getSettings() {
  const res = await fetch(
    'https://bunnyera-cloud-backend-production.up.railway.app/settings'
  )
  return res.json()
}

export async function updateSettings(data: any) {
  return fetch(
    'https://bunnyera-cloud-backend-production.up.railway.app/settings',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  )
}
