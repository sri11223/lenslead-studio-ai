import React from 'react';
import { Bell, Search, Settings, User, Menu, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-header-border bg-header-bg px-6 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers, events, payments..."
            className="pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* WhatsApp Credits */}
        <div className="flex items-center gap-2 rounded-lg bg-success-light px-3 py-2">
          <MessageSquare className="h-4 w-4 text-success" />
          <span className="text-sm font-medium text-success">892 credits</span>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-xs font-bold text-destructive-foreground p-0 flex items-center justify-center">
            3
          </Badge>
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="sm">
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-foreground">Rajesh Kumar</p>
            <p className="text-xs text-muted-foreground">Studio Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
};