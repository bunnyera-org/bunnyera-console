
export async function getTasks() {
  const res = await fetch(
    'https://bunnyera-cloud-backend-production.up.railway.app/tasks'
  )
  return res.json()
}

export async function cancelTask(id: string) {
  return fetch(
    `https://bunnyera-cloud-backend-production.up.railway.app/tasks/${id}/cancel`,
    { method: 'POST' }
  )
}

export async function retryTask(id: string) {
  return fetch(
    `https://bunnyera-cloud-backend-production.up.railway.app/tasks/${id}/retry`,
    { method: 'POST' }
  )
}
