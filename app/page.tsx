'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { bunnyClient } from '@/lib/websocket/client';
import { Task, Log, SystemStats } from '@/lib/types';
import { Activity, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    runningTasks: 0,
    failedTasks: 0,
    activeAgents: 0,
    systemHealth: 100
  });

  useEffect(() => {
    bunnyClient.connect();
    
    const unsubTasks = bunnyClient.subscribeToTasks((task) => {
      setTasks(prev => {
        // Update existing task or add new one
        const index = prev.findIndex(t => t.id === task.id);
        if (index >= 0) {
          const newTasks = [...prev];
          newTasks[index] = task;
          return newTasks;
        }
        return [task, ...prev].slice(0, 10);
      });
    });

    const unsubLogs = bunnyClient.subscribeToLogs((log) => {
      setLogs(prev => [log, ...prev].slice(0, 10));
    });

    const unsubStats = bunnyClient.subscribeToStats((newStats) => {
      setStats(newStats);
    });

    return () => {
      unsubTasks();
      unsubLogs();
      unsubStats();
    };
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-muted-foreground">Running Tasks</div>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{stats.runningTasks}</div>
            <p className="text-xs text-muted-foreground">Active processes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-muted-foreground">Failed Tasks</div>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <div className="text-2xl font-bold">{stats.failedTasks}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-muted-foreground">System Health</div>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{stats.systemHealth}%</div>
            <p className="text-xs text-muted-foreground">Operational status</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-muted-foreground">Active Agents</div>
              <Cpu className="h-4 w-4 text-secondary" />
            </div>
            <div className="text-2xl font-bold">{stats.activeAgents}</div>
            <p className="text-xs text-muted-foreground">Online modules</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">Waiting for tasks...</div>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{task.name}</span>
                      <span className="text-xs text-muted-foreground">{task.source} • {new Date(task.triggerTime).toLocaleTimeString()}</span>
                    </div>
                    <Badge 
                      variant={
                        task.status === 'running' ? 'default' : 
                        task.status === 'completed' ? 'success' : 
                        task.status === 'failed' ? 'error' : 'warning'
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Live Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {logs.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">Waiting for logs...</div>
              ) : (
                logs.map(log => (
                  <div key={log.id} className="text-xs flex gap-2">
                    <span className="text-muted-foreground whitespace-nowrap font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={
                      log.level === 'error' ? 'text-red-400 font-bold' : 
                      log.level === 'warn' ? 'text-yellow-400' : 
                      'text-blue-400'
                    }>
                      [{log.level.toUpperCase()}]
                    </span>
                    <span className="text-foreground break-all">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
