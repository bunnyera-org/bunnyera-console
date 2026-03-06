
'use client'

import { useEffect, useState } from 'react'
import { getAliyunMonitor } from '@/lib/api/aliyun'
import Card from '@/components/ui/card'
import StatusDot from '@/components/ui/status-dot'

export default function DashboardPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await getAliyunMonitor()
        setData(res)
      } catch (error) {
        console.error('Failed to load monitor data', error)
      }
    }
    load()
  }, [])

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold text-bunny-accent'>Dashboard</h1>
      <p className='text-gray-400'>系统总览 · BunnyEra Cloud</p>

      {/* 总览卡片区域 */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card title='资源总数'>
          <div className='text-4xl font-bold'>
            {data ? data.total_resources : '...'}
          </div>
        </Card>

        <Card title='运行中的服务'>
          <div className='flex items-center space-x-2'>
            <StatusDot status='online' />
            <span className='text-2xl font-semibold'>
              {data ? data.running_services : '...'}
            </span>
          </div>
        </Card>

        <Card title='异常资源'>
          <div className='flex items-center space-x-2'>
            <StatusDot status='error' />
            <span className='text-2xl font-semibold'>
              {data ? data.error_resources : '...'}
            </span>
          </div>
        </Card>
      </div>

      {/* 最近活动 */}
      <div className='mt-10'>
        <h2 className='text-xl font-semibold mb-4 text-bunny-accent'>最近活动</h2>
        <div className='bg-bunny-card p-4 rounded-lg border border-gray-800'>
          {data?.recent_logs?.length ? (
            <ul className='space-y-2'>
              {data.recent_logs.map((log: string, i: number) => (
                <li key={i} className='text-gray-300 text-sm'>
                  • {log}
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-500'>加载中...</p>
          )}
        </div>
      </div>
    </div>
  )
}
