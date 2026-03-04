'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { bunnyClient } from '@/lib/websocket/client';
import { Log } from '@/lib/types';
import { Search } from 'lucide-react';
import { clsx } from 'clsx';

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'info' | 'warn' | 'error'>('all');

  useEffect(() => {
    bunnyClient.connect();
    const unsub = bunnyClient.subscribeToLogs((log) => {
      setLogs(prev => [log, ...prev].slice(0, 100)); // Keep last 100
    });
    return unsub;
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) || 
                          log.module.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search logs..."
              className="pl-8 h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select 
            className="h-9 rounded-md border border-input bg-card text-foreground px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as any)}
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="w-full overflow-auto">
            <table className="w-full text-sm text-left font-mono">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-2 w-32">Timestamp</th>
                  <th className="px-4 py-2 w-24">Level</th>
                  <th className="px-4 py-2 w-32">Module</th>
                  <th className="px-4 py-2">Message</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/50 transition-colors border-b border-border last:border-0">
                    <td className="px-4 py-2 text-muted-foreground whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className={clsx("px-4 py-2 font-bold uppercase", {
                      'text-blue-500': log.level === 'info' || log.level === 'debug',
                      'text-yellow-500': log.level === 'warn',
                      'text-red-500': log.level === 'error',
                    })}>
                      {log.level}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{log.module}</td>
                    <td className="px-4 py-2 break-all">{log.message}</td>
                  </tr>
                ))}
                 {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground font-sans">
                      No logs found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
