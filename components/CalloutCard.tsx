'use client';

import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { CalloutCardProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function CalloutCard({ 
  variant = 'info', 
  title, 
  children, 
  className = '' 
}: CalloutCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          containerClass: 'warning-glow border-warning border-opacity-50',
          iconClass: 'text-warning',
          titleClass: 'text-warning',
          icon: AlertTriangle,
        };
      case 'error':
        return {
          containerClass: 'border-red-500 border-opacity-50 bg-red-500/5',
          iconClass: 'text-red-400',
          titleClass: 'text-red-400',
          icon: XCircle,
        };
      case 'success':
        return {
          containerClass: 'border-accent border-opacity-50 bg-accent/5',
          iconClass: 'text-accent',
          titleClass: 'text-accent',
          icon: CheckCircle,
        };
      default:
        return {
          containerClass: '',
          iconClass: 'text-primary',
          titleClass: 'text-primary',
          icon: Info,
        };
    }
  };

  const { containerClass, iconClass, titleClass, icon: Icon } = getVariantStyles();
  
  return (
    <div className={cn('glass-card p-6', containerClass, className)}>
      <div className="flex items-start gap-3">
        <Icon className={cn(iconClass, 'flex-shrink-0 mt-1')} size={20} />
        <div className="flex-1">
          {title && (
            <h3 className={cn('font-semibold mb-2', titleClass)}>
              {title}
            </h3>
          )}
          <div className="text-sm text-text-primary leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
