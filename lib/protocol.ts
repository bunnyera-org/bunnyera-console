import { Task, Log, Agent, SystemStats } from './types';

// Message types
export type MessageType = 'TASK_UPDATE' | 'LOG_ENTRY' | 'AGENT_STATUS' | 'SYSTEM_STATS' | 'ERROR';

export interface BaseMessage {
  type: MessageType;
  timestamp: string;
}

export interface TaskUpdateMessage extends BaseMessage {
  type: 'TASK_UPDATE';
  payload: Task;
}

export interface LogEntryMessage extends BaseMessage {
  type: 'LOG_ENTRY';
  payload: Log;
}

export interface AgentStatusMessage extends BaseMessage {
  type: 'AGENT_STATUS';
  payload: Agent;
}

export interface SystemStatsMessage extends BaseMessage {
  type: 'SYSTEM_STATS';
  payload: SystemStats;
}

export interface ErrorMessage extends BaseMessage {
  type: 'ERROR';
  payload: {
    code: string;
    message: string;
  };
}

export type WebSocketMessage = 
  | TaskUpdateMessage 
  | LogEntryMessage 
  | AgentStatusMessage 
  | SystemStatsMessage
  | ErrorMessage;

// Client-to-Server commands (if using WS for control)
export type CommandType = 'SUBSCRIBE' | 'UNSUBSCRIBE';

export interface CommandMessage {
  type: CommandType;
  topics: string[]; // e.g., ["tasks", "logs", "agents"]
}
