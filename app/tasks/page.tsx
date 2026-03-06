
'use client'

import { useEffect, useState, useCallback } from 'react'
import { getTasks } from '@/lib/api/tasks'
import TaskRow from '@/components/tasks/TaskRow'

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const res = await getTasks()
      setTasks(res.tasks || [])
    } catch (error) {
      console.error('Failed to load tasks', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    // 简单的轮询机制，每10秒刷新一次任务列表
    const interval = setInterval(load, 10000)
    return () => clearInterval(interval)
  }, [load])

  return (
    <div className='space-y-6'>
      <div className="flex justify-between items-center">
        <div>
          <h1 className='text-3xl font-bold text-bunny-accent'>Tasks</h1>
          <p className='text-gray-400'>任务管理 · BunnyEra Cloud</p>
        </div>
        <button 
          onClick={load}
          className="px-4 py-2 bg-bunny-card border border-gray-700 hover:border-bunny-accent text-sm rounded-md transition-colors"
        >
          刷新列表
        </button>
      </div>

      <div className='bg-bunny-card border border-gray-800 rounded-lg overflow-hidden'>
        <div className="overflow-x-auto">
          <table className='w-full text-left'>
            <thead className='bg-gray-900/50 border-b border-gray-700 text-gray-400 text-sm uppercase tracking-wider'>
              <tr>
                <th className='p-4 font-medium'>任务 ID</th>
                <th className='p-4 font-medium'>状态</th>
                <th className='p-4 font-medium'>来源</th>
                <th className='p-4 font-medium'>时间</th>
                <th className='p-4 font-medium'>操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading && tasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    加载中...
                  </td>
                </tr>
              ) : tasks.length > 0 ? (
                tasks.map((task, i) => (
                  <TaskRow key={task.id || i} task={task} reload={load} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    暂无任务记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
