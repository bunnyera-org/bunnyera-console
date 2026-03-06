
import StatusDot from '@/components/ui/status-dot'

export default function ResourceCard({ item }: any) {
  return (
    <div className='bg-bunny-card p-5 rounded-lg border border-gray-800 shadow-lg'>
      <div className='flex justify-between items-center mb-3'>
        <div className='text-lg font-semibold text-bunny-accent'>{item.name}</div>
        <StatusDot status={item.status} />
      </div>

      <div className='text-gray-400 text-sm'>
        类型：{item.type}
      </div>
      <div className='text-gray-400 text-sm'>
        区域：{item.region}
      </div>
      <div className='text-gray-400 text-sm'>
        使用量：{item.usage}
      </div>
    </div>
  )
}
