
// status utils
export type StatusType = 'online' | 'offline' | 'error' | 'warning' | 'running' | 'completed' | 'failed' | 'cancelled';

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'online':
    case 'completed':
    case 'running':
      return 'bg-green-400';
    case 'error':
    case 'failed':
      return 'bg-red-500';
    case 'warning':
      return 'bg-yellow-400';
    case 'offline':
    case 'cancelled':
    default:
      return 'bg-gray-500';
  }
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    online: '在线',
    offline: '离线',
    error: '错误',
    warning: '警告',
    running: '运行中',
    completed: '已完成',
    failed: '失败',
    cancelled: '已取消'
  };
  return map[status.toLowerCase()] || status;
}
