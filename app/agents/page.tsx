'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Bot, Code, Hammer, BrainCircuit, Network, HelpCircle } from 'lucide-react';
import { bunnyClient } from '@/lib/websocket/client';
import { Agent } from '@/lib/types';

const ICON_MAP: Record<string, any> = {
  'planner': BrainCircuit,
  'coder': Code,
  'builder': Hammer,
  'relay': Network,
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    bunnyClient.connect();
    
    // Initial mock data if none (optional, can be removed)
    if (agents.length === 0) {
      // In a real scenario, we might fetch the initial list via API
    }

    const unsub = bunnyClient.subscribeToAgents((agent) => {
      setAgents(prev => {
        const index = prev.findIndex(a => a.id === agent.id);
        if (index >= 0) {
          const newAgents = [...prev];
          newAgents[index] = agent;
          return newAgents;
        }
        return [...prev, agent];
      });
    });

    return unsub;
  }, []);

  const getIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    for (const key in ICON_MAP) {
      if (lowerName.includes(key)) return ICON_MAP[key];
    }
    return HelpCircle; // Default icon
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Agents & Modules</h2>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
          Register New Agent
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.length === 0 ? (
           <div className="col-span-full text-center py-10 text-muted-foreground">
             No agents detected. Waiting for connection...
           </div>
        ) : (
          agents.map((agent) => {
            const Icon = getIcon(agent.name);
            return (
              <Card key={agent.id} className="hover:border-primary/50 transition-colors cursor-pointer group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      {agent.name}
                    </div>
                  </CardTitle>
                  <Badge variant={agent.status === 'online' ? 'success' : agent.status === 'busy' ? 'warning' : 'outline'}>
                    {agent.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 h-10 line-clamp-2">
                    {agent.description || 'No description provided.'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities?.map(cap => (
                      <span key={cap} className="px-2 py-1 bg-muted rounded text-[10px] text-muted-foreground">
                        {cap}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground font-mono">
                    <span>ID: {agent.id}</span>
                    {agent.lastHeartbeat && (
                       <span>Last active: {new Date(agent.lastHeartbeat).toLocaleTimeString()}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
