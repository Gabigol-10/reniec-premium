import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiActivity,
  FiClock,
  FiUsers,
  FiCheckCircle
} from 'react-icons/fi';
import { staggerContainer, staggerItem } from '../utils/animations';

const StatItem = ({ icon: Icon, label, value, change, trend, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="d-flex align-items-start gap-3 p-3 rounded-3"
    style={{
      background: 'var(--bg-tertiary)',
      border: '1px solid var(--border-color)'
    }}
  >
    <div
      className="d-flex align-items-center justify-content-center flex-shrink-0"
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: 'var(--accent-light)',
        border: '1px solid var(--border-color)'
      }}
    >
      <Icon size={20} style={{ color: 'var(--accent-color)' }} />
    </div>
    <div className="flex-grow-1">
      <p className="mb-1 text-muted" style={{ fontSize: '0.75rem' }}>
        {label}
      </p>
      <div className="d-flex align-items-center justify-content-between">
        <h4 className="mb-0 fw-bold" style={{ fontSize: '1.25rem' }}>
          {value}
        </h4>
        {change && (
          <span
            className="d-flex align-items-center gap-1"
            style={{
              fontSize: '0.7rem',
              fontWeight: '600',
              color: trend === 'up' ? '#10B981' : '#EF4444'
            }}
          >
            {trend === 'up' ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
            {change}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

export const StatsGrid = ({ stats = [] }) => {
  const defaultStats = [
    {
      icon: FiUsers,
      label: 'Usuarios Totales',
      value: '1,234',
      change: '+12%',
      trend: 'up'
    },
    {
      icon: FiCheckCircle,
      label: 'Registros Completados',
      value: '98.5%',
      change: '+2.3%',
      trend: 'up'
    },
    {
      icon: FiActivity,
      label: 'Actividad Diaria',
      value: '456',
      change: '-5%',
      trend: 'down'
    },
    {
      icon: FiClock,
      label: 'Tiempo Promedio',
      value: '3.2 min',
      change: '-8%',
      trend: 'down'
    }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="row g-3"
    >
      {displayStats.map((stat, idx) => (
        <div key={idx} className="col-12 col-sm-6 col-lg-3">
          <StatItem {...stat} delay={idx * 0.1} />
        </div>
      ))}
    </motion.div>
  );
};

export default StatsGrid;
