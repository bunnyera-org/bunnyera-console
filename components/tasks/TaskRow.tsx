
'use client'

import { useState } from 'react'
import { cancelTask, retryTask } from '@/lib/api/tasks'

export default function TaskRow({ task, reload }: any) {
  const [loading, setLoading] = useState(false)

  async function handleCancel() {
    if (!confirm('确定要取消该任务吗？')) return
    setLoading(true)
    try {
      await cancelTask(task.id)
      reload()
    } finally {
      setLoading(false)
    }
  }

  async function handleRetry() {
    setLoading(true)
    try {
      await retryTask(task.id)
      reload()
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      case 'failed': return 'bg-red-500'
      case 'cancelled': return 'bg-gray-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <tr className='border-b border-gray-800 text-gray-300 hover:bg-white/5 transition-colors'>
      <td className='p-4 font-mono text-sm'>{task.id}</td>

      <td className='p-4'>
        <div className='flex items-center space-x-2'>
          <span className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></span>
          <span className="capitalize">{task.status}</span>
        </div>
      </td>

      <td className='p-4'>{task.source}</td>
      <td className='p-4 text-gray-400 text-sm'>{new Date(task.time || Date.now()).toLocaleString()}</td>

      <td className='p-4 space-x-3'>
        {task.status === 'running' && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className='text-red-400 hover:text-red-300 disabled:opacity-50 text-sm font-medium transition-colors'
          >
            {loading ? '取消中...' : '取消'}
          </button>
        )}

        {task.status === 'failed' && (
          <button
            onClick={handleRetry}
            disabled={loading}
            className='text-bunny-accent hover:text-blue-300 disabled:opacity-50 text-sm font-medium transition-colors'
          >
            {loading ? '重试中...' : '重试'}
          </button>
        )}
      </td>
    </tr>
  )
}
