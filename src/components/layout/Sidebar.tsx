import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  CreditCard, 
  Sparkles, 
  MessageSquare, 
  FolderOpen, 
  Settings, 
  Database, 
  TrendingUp,
  Camera,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Events & Bookings', href: '/events', icon: Calendar },
  { name: 'Payments & Credits', href: '/payments', icon: CreditCard },
  { name: 'AI Photo Tools', href: '/ai-tools', icon: Sparkles },
  { name: 'WhatsApp Messaging', href: '/messaging', icon: MessageSquare },
  { name: 'File Manager', href: '/files', icon: FolderOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Backup & Sync', href: '/backup', icon: Database },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className={cn(
      "relative bg-sidebar-bg border-r border-header-border transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-hover px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Camera className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">Studio Manager</h1>
            </div>
          )}
        </div>
        
        <button
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-hover text-sidebar-foreground hover:bg-sidebar-active hover:text-primary-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 group",
                    active
                      ? "bg-sidebar-active text-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    active ? "text-primary-foreground" : "text-sidebar-foreground group-hover:text-sidebar-foreground"
                  )} />
                  {!collapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Status */}
      {!collapsed && (
        <div className="border-t border-sidebar-hover p-4">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-hover p-3">
            <div className="h-8 w-8 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-sm font-semibold text-accent-gold-foreground">RS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Raj Studio</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">Owner</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};