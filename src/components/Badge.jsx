import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: {
    bg: 'rgba(59, 130, 246, 0.15)',
    color: '#3B82F6',
    border: 'rgba(59, 130, 246, 0.3)'
  },
  success: {
    bg: 'rgba(16, 185, 129, 0.15)',
    color: '#10B981',
    border: 'rgba(16, 185, 129, 0.3)'
  },
  danger: {
    bg: 'rgba(239, 68, 68, 0.15)',
    color: '#EF4444',
    border: 'rgba(239, 68, 68, 0.3)'
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.15)',
    color: '#F59E0B',
    border: 'rgba(245, 158, 11, 0.3)'
  },
  info: {
    bg: 'rgba(6, 182, 212, 0.15)',
    color: '#06B6D4',
    border: 'rgba(6, 182, 212, 0.3)'
  }
};

export const Badge = ({ 
  children, 
  variant = 'primary', 
  dot = false,
  pulse = false,
  size = 'md' 
}) => {
  const style = variants[variant] || variants.primary;
  
  const sizes = {
    sm: { padding: '4px 10px', fontSize: '0.7rem' },
    md: { padding: '6px 12px', fontSize: '0.75rem' },
    lg: { padding: '8px 16px', fontSize: '0.85rem' }
  };

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className="d-inline-flex align-items-center gap-2"
      style={{
        ...sizes[size],
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        borderRadius: '6px',
        fontWeight: '600',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap'
      }}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: style.color,
            display: 'inline-block',
            animation: pulse ? 'pulse 2s infinite' : 'none'
          }}
        />
      )}
      {children}
    </motion.span>
  );
};

export default Badge;
