
'use client'

import ReactECharts from 'echarts-for-react'

export default function Chart({ option, height = 300 }: any) {
  return (
    <div className='bg-bunny-card p-5 rounded-lg border border-gray-800 shadow-lg'>
      <ReactECharts option={option} style={{ height }} />
    </div>
  )
}
