import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Tooltip = ({ children, content, placement = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' }
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              ...positions[placement],
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: '500',
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              zIndex: 9999,
              boxShadow: 'var(--shadow-lg)',
              pointerEvents: 'none'
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
