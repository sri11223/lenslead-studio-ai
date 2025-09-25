import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background font-sans">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex flex-1 flex-col">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <main className="flex-1 overflow-auto bg-gradient-subtle">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
        
        <footer className="border-t border-header-border bg-header-bg px-6 py-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success"></div>
                Connected
              </span>
              <span>Photography Studio Manager v2.1.0</span>
            </div>
            <div className="flex items-center gap-4">
              <span>₹12,450 pending payments</span>
              <span>Last sync: 2 min ago</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};