import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  color = '#3B82F6',
  height = '8px',
  showLabel = false,
  label = '',
  animated = true
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-100">
      {showLabel && (
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="text-secondary" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
            {label}
          </span>
          <span className="text-primary" style={{ fontSize: '0.85rem', fontWeight: '600' }}>
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          background: 'var(--bg-tertiary)',
          borderRadius: '100px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 1 : 0, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            borderRadius: '100px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {animated && (
            <motion.div
              animate={{
                x: ['0%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
