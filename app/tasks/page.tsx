'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { bunnyClient } from '@/lib/websocket/client';
import { Task } from '@/lib/types';
import { Play, RotateCw, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'running' | 'completed' | 'failed'>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    bunnyClient.connect();
    const unsub = bunnyClient.subscribeToTasks((task) => {
      setTasks(prev => {
        // Update existing or add new
        const index = prev.findIndex(t => t.id === task.id);
        if (index >= 0) {
          const newTasks = [...prev];
          newTasks[index] = task;
          return newTasks;
        }
        return [task, ...prev];
      });
    });
    return unsub;
  }, []);

  const handleTriggerTask = async () => {
    setLoading(true);
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'demo-task',
          params: { timestamp: Date.now() }
        }),
      });
    } catch (error) {
      console.error('Failed to trigger task', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}/retry`, { method: 'POST' });
    } catch (error) {
      console.error(`Failed to retry task ${id}`, error);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}/cancel`, { method: 'POST' });
    } catch (error) {
      console.error(`Failed to cancel task ${id}`, error);
    }
  };

  const filteredTasks = tasks.filter(t => filter === 'all' || t.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
        <button 
          onClick={handleTriggerTask}
          disabled={loading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          {loading ? 'Triggering...' : 'Trigger Task'}
        </button>
      </div>

      <div className="flex gap-2 pb-4">
        {(['all', 'running', 'completed', 'failed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-medium border capitalize transition-colors',
              filter === f 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-background text-muted-foreground border-border hover:bg-accent'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="w-full overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3">Task ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Source</th>
                  <th className="px-6 py-3">Triggered At</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="bg-card border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{task.id}</td>
                    <td className="px-6 py-4 font-medium">{task.name}</td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        task.status === 'running' ? 'default' : 
                        task.status === 'completed' ? 'success' : 
                        task.status === 'failed' ? 'error' : 'warning'
                      }>
                        {task.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{task.source}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(task.triggerTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleRetry(task.id)}
                          className="text-muted-foreground hover:text-primary transition-colors" 
                          title="Retry"
                        >
                          <RotateCw className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleCancel(task.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors" 
                          title="Cancel"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTasks.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No tasks found.
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
