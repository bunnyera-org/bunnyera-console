
'use client'

import { useEffect, useState } from 'react'
import { getAgents } from '@/lib/api/agents'
import AgentCard from '@/components/agents/AgentCard'

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await getAgents()
        setAgents(res.agents || [])
      } catch (error) {
        console.error('Failed to load agents', error)
      }
    }
    load()
  }, [])

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold text-bunny-accent'>Agents</h1>
      <p className='text-gray-400'>智能体管理 · BunnyEra Cloud</p>

      {agents.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {agents.map((agent, i) => (
            <AgentCard key={i} agent={agent} />
          ))}
        </div>
      ) : (
        <div className='text-center py-10 text-gray-500'>
          暂无在线智能体
        </div>
      )}
    </div>
  )
}
