import { Task, Log, Agent, SystemStats } from '../types';
import { WebSocketMessage, CommandMessage } from '../protocol';

type TaskCallback = (task: Task) => void;
type LogCallback = (log: Log) => void;
type AgentCallback = (agent: Agent) => void;
type StatsCallback = (stats: SystemStats) => void;

class BunnyEraClient {
  private ws: WebSocket | null = null;
  private url: string = '';
  private token: string = '';
  
  private taskSubscribers: Set<TaskCallback> = new Set();
  private logSubscribers: Set<LogCallback> = new Set();
  private agentSubscribers: Set<AgentCallback> = new Set();
  private statsSubscribers: Set<StatsCallback> = new Set();

  private reconnectTimer: NodeJS.Timeout | null = null;
  private reconnectInterval: number = 3000;
  private isConnecting: boolean = false;
  private shouldReconnect: boolean = true;

  constructor() {
    // Initialize with default or empty values, will be set by connect()
  }

  /**
   * Initialize connection using settings
   */
  public connect(url?: string, token?: string) {
    if (typeof window === 'undefined') return; // Server-side check

    const gatewayUrl = url || 
      localStorage.getItem('bunnyera_gateway_url') || 
      process.env.NEXT_PUBLIC_BUNNYERA_GATEWAY_URL || 
      'ws://localhost:8080';
      
    const authToken = token || 
      localStorage.getItem('bunnyera_token') || 
      '';

    this.url = gatewayUrl;
    this.token = authToken;
    this.shouldReconnect = true;

    this.establishConnection();
  }

  private establishConnection() {
    if (this.ws || this.isConnecting) return;
    this.isConnecting = true;

    console.log(`[BunnyEra] Connecting to ${this.url}...`);
    
    try {
      // Append token to query params or protocols if needed
      // const wsUrl = new URL(this.url);
      // if (this.token) wsUrl.searchParams.set('token', this.token);
      
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('[BunnyEra] Connected');
        this.isConnecting = false;
        this.reconnectInterval = 3000; // Reset backoff
        
        // Subscribe to topics
        this.send({
          type: 'SUBSCRIBE',
          topics: ['tasks', 'logs', 'agents', 'stats']
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (e) {
          console.error('[BunnyEra] Failed to parse message:', event.data, e);
        }
      };

      this.ws.onclose = () => {
        console.log('[BunnyEra] Disconnected');
        this.ws = null;
        this.isConnecting = false;
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('[BunnyEra] WebSocket error:', error);
        this.ws?.close();
      };

    } catch (e) {
      console.error('[BunnyEra] Connection failed:', e);
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (!this.shouldReconnect) return;
    
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    
    console.log(`[BunnyEra] Reconnecting in ${this.reconnectInterval}ms...`);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectInterval = Math.min(this.reconnectInterval * 1.5, 30000); // Exponential backoff max 30s
      this.establishConnection();
    }, this.reconnectInterval);
  }

  public disconnect() {
    this.shouldReconnect = false;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private send(message: CommandMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  private handleMessage(message: WebSocketMessage) {
    switch (message.type) {
      case 'TASK_UPDATE':
        this.taskSubscribers.forEach(cb => cb(message.payload));
        break;
      case 'LOG_ENTRY':
        this.logSubscribers.forEach(cb => cb(message.payload));
        break;
      case 'AGENT_STATUS':
        this.agentSubscribers.forEach(cb => cb(message.payload));
        break;
      case 'SYSTEM_STATS':
        this.statsSubscribers.forEach(cb => cb(message.payload));
        break;
      case 'ERROR':
        console.error('[BunnyEra] Server error:', message.payload);
        break;
    }
  }

  // Subscription methods
  public subscribeToTasks(callback: TaskCallback) {
    this.taskSubscribers.add(callback);
    return () => this.taskSubscribers.delete(callback);
  }

  public subscribeToLogs(callback: LogCallback) {
    this.logSubscribers.add(callback);
    return () => this.logSubscribers.delete(callback);
  }

  public subscribeToAgents(callback: AgentCallback) {
    this.agentSubscribers.add(callback);
    return () => this.agentSubscribers.delete(callback);
  }

  public subscribeToStats(callback: StatsCallback) {
    this.statsSubscribers.add(callback);
    return () => this.statsSubscribers.delete(callback);
  }
}

// Singleton instance
export const bunnyClient = new BunnyEraClient();
