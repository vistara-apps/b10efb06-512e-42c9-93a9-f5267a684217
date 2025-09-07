'use client';

import { AlertTriangle, Sparkles } from 'lucide-react';
import { HeaderProps } from '@/lib/types';
import { APP_CONFIG } from '@/lib/constants';
import { useShmooContractRead } from '@/lib/hooks/useShmooContract';
import { motion } from 'framer-motion';

export function Header({ withWarningBanner = true }: HeaderProps) {
  const { totalSupply, totalSupplyLoading } = useShmooContractRead();

  return (
    <motion.header 
      className="w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="text-accent w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl font-bold text-shadow bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Shmoo
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-text-muted">
          {!totalSupplyLoading && totalSupply !== undefined && (
            <div className="glass-card px-3 py-1 text-xs">
              <span className="text-accent font-semibold">{totalSupply.toString()}</span>
              <span className="ml-1">Claimed</span>
            </div>
          )}
          <div className="bg-accent/20 px-3 py-1 rounded-full text-xs text-accent border border-accent/30">
            Base Mini App
          </div>
        </div>
      </div>
      
      <div className="mb-8 text-center">
        <motion.h2 
          className="text-4xl font-bold mb-3 text-shadow"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {APP_CONFIG.name}
        </motion.h2>
        <motion.p 
          className="text-text-muted text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {APP_CONFIG.tagline}
        </motion.p>
      </div>

      {withWarningBanner && (
        <motion.div 
          className="glass-card p-6 mb-8 warning-glow border-warning border-opacity-50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-warning flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-warning mb-2 text-lg">
                ⚠️ IMPORTANT DISCLAIMER
              </h3>
              <p className="text-sm text-text-primary leading-relaxed">
                {APP_CONFIG.warningMessage}
              </p>
              <p className="text-xs text-text-muted mt-2">
                By claiming a Shmoo Point, you acknowledge that it serves no purpose other than 
                digital identity and participation in the Shmoo community.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
