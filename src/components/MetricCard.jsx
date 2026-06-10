import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export const MetricCard = ({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  changeLabel = 'vs mes anterior',
  trend = 'up',
  color = '#3B82F6',
  delay = 0
}) => {
  const isPositive = trend === 'up';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="glass-panel p-4 h-100"
      style={{ 
        background: 'var(--glass-bg)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Gradient background decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: delay + 0.2 }}
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: `${color}15`,
              border: `1px solid ${color}30`
            }}
          >
            <Icon size={24} style={{ color }} />
          </div>

          {change !== undefined && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.3, type: 'spring' }}
              className="d-flex align-items-center gap-1"
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                background: isPositive 
                  ? 'rgba(16, 185, 129, 0.1)' 
                  : 'rgba(239, 68, 68, 0.1)',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}
            >
              <span style={{ color: isPositive ? '#10B981' : '#EF4444' }}>
                {isPositive ? '↑' : '↓'} {Math.abs(change)}%
              </span>
            </motion.div>
          )}
        </div>

        <div>
          <p 
            className="text-secondary mb-1" 
            style={{ 
              fontSize: '0.8rem',
              fontWeight: '500',
              letterSpacing: '0.02em'
            }}
          >
            {title}
          </p>
          <h3 
            className="fw-bold mb-0" 
            style={{ 
              fontSize: '1.75rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}
          >
            <AnimatedCounter value={value} />
          </h3>
          {changeLabel && (
            <p 
              className="text-muted mb-0 mt-1" 
              style={{ fontSize: '0.7rem' }}
            >
              {changeLabel}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
