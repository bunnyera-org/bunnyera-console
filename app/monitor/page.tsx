
'use client'

import { useEffect, useState } from 'react'
import { getAliyunMonitor } from '@/lib/api/aliyun'
import ResourceCard from '@/components/monitor/ResourceCard'
import UsageChart from '@/components/monitor/UsageChart'

export default function MonitorPage() {
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
      <h1 className='text-3xl font-bold text-bunny-accent'>阿里云资源监控</h1>
      <p className='text-gray-400'>实时监控 · BunnyEra Cloud</p>

      {/* 资源卡片区域 */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {data?.resources?.length ? (
          data.resources.map((item: any, i: number) => (
            <ResourceCard key={i} item={item} />
          ))
        ) : (
          <div className="text-gray-500 col-span-3 text-center py-10">
            {data ? '暂无资源数据' : '加载中...'}
          </div>
        )}
      </div>

      {/* 使用量图表 */}
      <div className='mt-10'>
        <UsageChart data={data?.usage} />
      </div>
    </div>
  )
}
