
export async function getAliyunMonitor() {
  const res = await fetch('https://bunnyera-cloud-backend-production.up.railway.app/aliyun/monitor/all')
  return res.json()
}
