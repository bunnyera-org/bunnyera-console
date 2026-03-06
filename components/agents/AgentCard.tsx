
import StatusDot from '@/components/ui/status-dot'

export default function AgentCard({ agent }: any) {
  return (
    <div className='bg-bunny-card p-5 rounded-lg border border-gray-800 shadow-lg'>
      <div className='flex justify-between items-center mb-3'>
        <div className='text-lg font-semibold text-bunny-accent'>
          {agent.name}
        </div>
        <StatusDot status={agent.status} />
      </div>

      <div className='text-gray-400 text-sm mb-1'>
        类型：{agent.type}
      </div>
      <div className='text-gray-400 text-sm mb-1'>
        能力：{agent.capabilities?.join(', ') || '无'}
      </div>
      <div className='text-gray-400 text-sm'>
        心跳：{agent.last_heartbeat}
      </div>
    </div>
  )
}
