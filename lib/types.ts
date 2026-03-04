// Core types shared across the application
export interface Task {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  triggerTime: string; // ISO date string
  source: string; // e.g., "Planner", "Scheduler"
  details?: string;
  // Additional metadata
  params?: Record<string, any>;
  result?: any;
  error?: string;
}

export interface Log {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  module: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  status: 'online' | 'offline' | 'busy';
  lastHeartbeat?: string;
  config: Record<string, any>;
  type: 'core' | 'worker' | 'infrastructure';
}

export interface SystemSettings {
  gatewayUrl: string;
  environment: 'dev' | 'prod' | 'staging';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  token?: string;
}

// Statistics summary for Dashboard
export interface SystemStats {
  runningTasks: number;
  failedTasks: number;
  activeAgents: number;
  systemHealth: number; // 0-100
}
