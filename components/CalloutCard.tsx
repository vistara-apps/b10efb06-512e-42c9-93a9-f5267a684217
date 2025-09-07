'use client';

import { AlertTriangle, Info } from 'lucide-react';

interface CalloutCardProps {
  variant?: 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function CalloutCard({ 
  variant = 'info', 
  title, 
  children, 
  className = '' 
}: CalloutCardProps) {
  const isWarning = variant === 'warning';
  
  return (
    <div className={`glass-card p-6 ${isWarning ? 'warning-glow border-warning border-opacity-50' : ''} ${className}`}>
      <div className="flex items-start gap-3">
        {isWarning ? (
          <AlertTriangle className="text-warning flex-shrink-0 mt-1" size={20} />
        ) : (
          <Info className="text-primary flex-shrink-0 mt-1" size={20} />
        )}
        <div>
          {title && (
            <h3 className={`font-semibold mb-2 ${isWarning ? 'text-warning' : 'text-primary'}`}>
              {title}
            </h3>
          )}
          <div className="text-sm text-white leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
