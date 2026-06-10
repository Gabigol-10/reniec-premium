import React from 'react';
import { motion } from 'framer-motion';
import './SkeletonLoader.css';

// Skeleton components para loading states profesionales
export const SkeletonCard = ({ height = '120px' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="skeleton-card glass-panel"
    style={{ height }}
  >
    <div className="skeleton-shimmer" />
  </motion.div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="skeleton-table glass-panel p-4"
  >
    <div className="skeleton-bar mb-3" style={{ width: '30%', height: '24px' }} />
    <div className="skeleton-bar mb-4" style={{ width: '60%', height: '16px' }} />
    
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="d-flex gap-3 mb-3">
        <div className="skeleton-bar" style={{ width: '15%', height: '40px' }} />
        <div className="skeleton-bar" style={{ width: '30%', height: '40px' }} />
        <div className="skeleton-bar" style={{ width: '25%', height: '40px' }} />
        <div className="skeleton-bar" style={{ width: '20%', height: '40px' }} />
        <div className="skeleton-bar" style={{ width: '10%', height: '40px' }} />
      </div>
    ))}
  </motion.div>
);

export const SkeletonChart = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="skeleton-chart glass-panel p-4"
  >
    <div className="skeleton-bar mb-4" style={{ width: '40%', height: '24px' }} />
    <div className="skeleton-chart-bars d-flex align-items-end justify-content-between gap-2" style={{ height: '300px' }}>
      {[65, 85, 45, 75, 90, 55, 70, 60].map((height, i) => (
        <div
          key={i}
          className="skeleton-bar flex-grow-1"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  </motion.div>
);

export const SkeletonText = ({ lines = 3 }) => (
  <div className="skeleton-text">
    {[...Array(lines)].map((_, i) => (
      <div
        key={i}
        className="skeleton-bar mb-2"
        style={{
          width: i === lines - 1 ? '60%' : '100%',
          height: '16px'
        }}
      />
    ))}
  </div>
);

export default {
  Card: SkeletonCard,
  Table: SkeletonTable,
  Chart: SkeletonChart,
  Text: SkeletonText
};
