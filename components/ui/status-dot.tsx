
export default function StatusDot({ status }: { status: string }) {
  const color =
    status === 'online'
      ? 'bg-green-400'
      : status === 'error'
      ? 'bg-red-500'
      : status === 'busy'
      ? 'bg-yellow-400'
      : 'bg-gray-500'

  return <span className={`inline-block w-3 h-3 rounded-full ${color}`}></span>
}
