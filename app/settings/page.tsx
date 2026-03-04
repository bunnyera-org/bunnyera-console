'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Save } from 'lucide-react';
import { bunnyClient } from '@/lib/websocket/client';

export default function SettingsPage() {
  const [gatewayUrl, setGatewayUrl] = useState('');
  const [token, setToken] = useState('');
  const [environment, setEnvironment] = useState('dev');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load initial values from localStorage
    setGatewayUrl(localStorage.getItem('bunnyera_gateway_url') || process.env.NEXT_PUBLIC_BUNNYERA_GATEWAY_URL || 'ws://localhost:8080');
    setToken(localStorage.getItem('bunnyera_token') || '');
    setEnvironment('dev'); // Could also persist this
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      // Save to localStorage
      localStorage.setItem('bunnyera_gateway_url', gatewayUrl);
      localStorage.setItem('bunnyera_token', token);
      
      // Save to server/cookies via API
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gatewayUrl, token, environment }),
      });

      // Reconnect WebSocket
      bunnyClient.disconnect();
      bunnyClient.connect(gatewayUrl, token);

      setMessage('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings', error);
      setMessage('Failed to save settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Connection Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Gateway URL</label>
              <input 
                type="text" 
                value={gatewayUrl}
                onChange={(e) => setGatewayUrl(e.target.value)}
                placeholder="ws://localhost:8080"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">The WebSocket address for BunnyEra Claw.</p>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Environment</label>
              <select 
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="dev">Development</option>
                <option value="staging">Staging</option>
                <option value="prod">Production</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">BunnyEra Token</label>
              <input 
                type="password" 
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="bunny_sk_..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end items-center gap-4">
          {message && <span className="text-sm text-green-500">{message}</span>}
          <button 
            onClick={handleSave}
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
