
'use client'

import ReactECharts from 'echarts-for-react'

export default function UsageChart({ data }: any) {
  const option = {
    backgroundColor: 'transparent',
    textStyle: { color: '#E2E8F0' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: data?.map((d: any) => d.time) || [],
      axisLine: { lineStyle: { color: '#4CC9F0' } }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#4CC9F0' } },
      splitLine: { lineStyle: { color: '#1f2937' } }
    },
    series: [
      {
        data: data?.map((d: any) => d.value) || [],
        type: 'line',
        smooth: true,
        itemStyle: { color: '#4CC9F0' },
        lineStyle: { color: '#4CC9F0' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(76, 201, 240, 0.5)' },
              { offset: 1, color: 'rgba(76, 201, 240, 0)' }
            ]
          }
        }
      }
    ]
  }

  return (
    <div className='bg-bunny-card p-5 rounded-lg border border-gray-800 shadow-lg'>
      <div className='text-bunny-accent text-lg font-semibold mb-4'>
        资源使用趋势
      </div>
      <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />
    </div>
  )
}
