
'use client'

import { useEffect, useState } from 'react'
import { getSettings, updateSettings } from '@/lib/api/settings'

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  async function load() {
    try {
      const res = await getSettings()
      setSettings(res)
    } catch (error) {
      console.error('Failed to load settings', error)
      setMessage({ type: 'error', text: '加载设置失败' })
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    setMessage(null)
    try {
      await updateSettings(settings)
      setMessage({ type: 'success', text: '设置保存成功' })
      // 3秒后清除成功消息
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error('Failed to save settings', error)
      setMessage({ type: 'error', text: '保存设置失败' })
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) {
    return <p className='text-gray-400 p-6'>加载中...</p>
  }

  if (!settings) {
    return (
      <div className="p-6">
        <p className='text-red-400'>无法获取设置数据，请检查网络连接或后端服务。</p>
        <button 
          onClick={load}
          className="mt-4 px-4 py-2 bg-bunny-card border border-gray-700 hover:border-bunny-accent rounded text-sm transition-colors"
        >
          重试
        </button>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold text-bunny-accent'>Settings</h1>
      <p className='text-gray-400'>系统设置 · BunnyEra Cloud</p>

      <div className='bg-bunny-card p-6 rounded-lg border border-gray-800 space-y-6 max-w-2xl'>
        
        {message && (
          <div className={`p-3 rounded text-sm ${
            message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {message.text}
          </div>
        )}

        {/* 网关地址 */}
        <div className="space-y-2">
          <label className='text-gray-300 text-sm font-medium'>Gateway URL</label>
          <input 
            className='w-full p-2.5 rounded bg-gray-900 border border-gray-700 text-gray-200 focus:border-bunny-accent focus:ring-1 focus:ring-bunny-accent outline-none transition-all'
            value={settings.gateway_url || ''}
            onChange={(e) => 
              setSettings({ ...settings, gateway_url: e.target.value })
            }
            placeholder="https://api.example.com"
          />
          <p className="text-xs text-gray-500">后端 API 网关地址</p>
        </div>

        {/* 运行环境 */}
        <div className="space-y-2">
          <label className='text-gray-300 text-sm font-medium'>Environment</label>
          <select 
            className='w-full p-2.5 rounded bg-gray-900 border border-gray-700 text-gray-200 focus:border-bunny-accent outline-none transition-all'
            value={settings.environment || 'dev'}
            onChange={(e) => 
              setSettings({ ...settings, environment: e.target.value })
            }
          >
            <option value='dev'>Development</option>
            <option value='staging'>Staging</option>
            <option value='prod'>Production</option>
          </select>
          <p className="text-xs text-gray-500">当前系统运行环境</p>
        </div>

        {/* 日志级别 */}
        <div className="space-y-2">
          <label className='text-gray-300 text-sm font-medium'>Log Level</label>
          <select 
            className='w-full p-2.5 rounded bg-gray-900 border border-gray-700 text-gray-200 focus:border-bunny-accent outline-none transition-all'
            value={settings.log_level || 'info'}
            onChange={(e) => 
              setSettings({ ...settings, log_level: e.target.value })
            }
          >
            <option value='debug'>Debug</option>
            <option value='info'>Info</option>
            <option value='warn'>Warning</option>
            <option value='error'>Error</option>
          </select>
          <p className="text-xs text-gray-500">系统日志记录详细程度</p>
        </div>

        {/* Token */}
        <div className="space-y-2">
          <label className='text-gray-300 text-sm font-medium'>Auth Token</label>
          <input 
            type="password"
            className='w-full p-2.5 rounded bg-gray-900 border border-gray-700 text-gray-200 focus:border-bunny-accent focus:ring-1 focus:ring-bunny-accent outline-none transition-all'
            value={settings.token || ''}
            onChange={(e) => 
              setSettings({ ...settings, token: e.target.value })
            }
            placeholder="••••••••••••••••"
          />
          <p className="text-xs text-gray-500">用于系统间通信的认证令牌</p>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <button 
            onClick={handleSave}
            disabled={saving}
            className='bg-bunny-accent text-gray-900 font-medium px-6 py-2.5 rounded hover:bg-bunny-accent/90 focus:ring-2 focus:ring-offset-2 focus:ring-bunny-accent focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
          >
            {saving ? '保存中...' : '保存设置'}
          </button>
        </div>
      </div>
    </div>
  )
}
