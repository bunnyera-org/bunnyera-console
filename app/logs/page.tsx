
'use client'

import { useEffect, useState, useRef } from 'react'
import { getLogs } from '@/lib/api/logs'

export default function LogsPage() {
  const [logs, setLogs] = useState<string[]>([])
  const logContainerRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)

  async function load() {
    try {
      const res = await getLogs()
      setLogs(res.logs || [])
    } catch (error) {
      console.error('Failed to load logs', error)
    }
  }

  useEffect(() => {
    load()
    const interval = setInterval(load, 3000) // 每 3 秒刷新
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs, autoScroll])

  const handleScroll = () => {
    if (logContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = logContainerRef.current
      const isBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 50
      setAutoScroll(isBottom)
    }
  }

  return (
    <div className='space-y-6'>
      <div className="flex justify-between items-center">
        <div>
          <h1 className='text-3xl font-bold text-bunny-accent'>Logs</h1>
          <p className='text-gray-400'>日志中心 · BunnyEra Cloud</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${autoScroll ? 'bg-green-500' : 'bg-gray-500'}`}></span>
          <span className="text-xs text-gray-400">{autoScroll ? '自动滚动开启' : '自动滚动暂停'}</span>
        </div>
      </div>

      <div 
        ref={logContainerRef}
        onScroll={handleScroll}
        className='bg-bunny-card p-5 rounded-lg border border-gray-800 h-[600px] overflow-y-auto font-mono text-sm'
      >
        {logs.length ? (
          logs.map((line, i) => (
            <div key={i} className='text-gray-300 hover:bg-white/5 px-2 py-0.5 rounded transition-colors break-all'>
              <span className="text-gray-500 mr-2 select-none">{(i + 1).toString().padStart(4, '0')}</span>
              {line}
            </div>
          ))
        ) : (
          <div className='text-gray-500 h-full flex items-center justify-center'>
            加载中...
          </div>
        )}
      </div>
    </div>
  )
}
