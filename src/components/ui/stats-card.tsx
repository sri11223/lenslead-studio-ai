import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  variant = 'default',
  className,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-light border-primary/20';
      case 'success':
        return 'bg-success-light border-success/20';
      case 'warning':
        return 'bg-warning-light border-warning/20';
      case 'danger':
        return 'bg-destructive-light border-destructive/20';
      default:
        return 'bg-card border-border';
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-primary bg-primary/10';
      case 'success':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'danger':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const getChangeStyles = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={cn(
      'transition-all duration-200 hover:shadow-md',
      getVariantStyles(),
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={cn('text-sm font-medium', getChangeStyles())}>
                {change}
              </p>
            )}
          </div>
          <div className={cn(
            'flex h-12 w-12 items-center justify-center rounded-lg',
            getIconStyles()
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};