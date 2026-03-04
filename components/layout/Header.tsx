'use client';

import { Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur fixed top-0 left-64 right-0 z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-500">Connected</span>
        </div>
        <div className="text-xs text-muted-foreground border-l border-border pl-4">
          Env: <span className="text-foreground">Development</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
          AD
        </div>
      </div>
    </header>
  );
}
