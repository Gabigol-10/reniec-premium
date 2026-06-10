import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiInbox, 
  FiUsers, 
  FiSearch, 
  FiAlertCircle,
  FiFileText,
  FiDatabase
} from 'react-icons/fi';

const icons = {
  inbox: FiInbox,
  users: FiUsers,
  search: FiSearch,
  alert: FiAlertCircle,
  file: FiFileText,
  database: FiDatabase
};

export const EmptyState = ({ 
  icon = 'inbox',
  title = 'No hay datos disponibles',
  description = 'No se encontraron resultados para mostrar.',
  action,
  actionLabel = 'Crear nuevo',
  compact = false
}) => {
  const Icon = icons[icon] || FiInbox;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`empty-state text-center ${compact ? 'py-4' : 'py-5'}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="empty-state-icon mx-auto mb-3"
        style={{
          width: compact ? '60px' : '80px',
          height: compact ? '60px' : '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--accent-light)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)'
        }}
      >
        <Icon size={compact ? 28 : 36} style={{ color: 'var(--accent-color)', opacity: 0.8 }} />
      </motion.div>

      <motion.h5
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fw-bold mb-2"
        style={{ 
          fontSize: compact ? '1rem' : '1.1rem',
          color: 'var(--text-primary)'
        }}
      >
        {title}
      </motion.h5>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-secondary mb-0"
        style={{ 
          fontSize: compact ? '0.85rem' : '0.9rem',
          maxWidth: '400px',
          margin: '0 auto'
        }}
      >
        {description}
      </motion.p>

      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <button onClick={action} className="btn btn-primary">
            {actionLabel}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
