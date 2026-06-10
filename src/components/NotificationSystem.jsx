import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiInfo, FiAlertTriangle, FiXCircle, FiX } from 'react-icons/fi';
import { useNotifications } from '../context/NotificationContext';

export const NotificationSystem = () => {
  const { notifications, removeNotification } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-success fs-5" />;
      case 'warning':
        return <FiAlertTriangle className="text-warning fs-5" />;
      case 'error':
        return <FiXCircle className="text-danger fs-5" />;
      case 'info':
      default:
        return <FiInfo className="text-primary fs-5" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'rgba(16, 185, 129, 0.3)';
      case 'warning':
        return 'rgba(245, 158, 11, 0.3)';
      case 'error':
        return 'rgba(239, 68, 68, 0.3)';
      case 'info':
      default:
        return 'rgba(59, 130, 246, 0.3)';
    }
  };

  return (
    <div 
      className="position-fixed bottom-0 end-0 p-4 z-5" 
      style={{ maxWidth: '420px', width: '100%', pointerEvents: 'none' }}
    >
      <div className="d-flex flex-column gap-3">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              layout
              className="glass-panel p-3 d-flex align-items-start gap-3"
              style={{ 
                pointerEvents: 'auto',
                borderLeft: `4px solid ${getBorderColor(notif.type)}`,
                boxShadow: 'var(--shadow-premium)',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 text-primary fw-medium" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                  {notif.message}
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => removeNotification(notif.id)}
                className="btn border-0 p-0 text-muted hover-text-primary"
                style={{ background: 'transparent' }}
              >
                <FiX />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default NotificationSystem;
