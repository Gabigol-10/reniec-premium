import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiUser, FiFileText, FiDownload } from 'react-icons/fi';

export const FloatingActionButton = ({ actions = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultActions = [
    { icon: FiUser, label: 'Nuevo Usuario', action: () => console.log('Nuevo usuario') },
    { icon: FiFileText, label: 'Generar Reporte', action: () => console.log('Reporte') },
    { icon: FiDownload, label: 'Exportar Datos', action: () => console.log('Exportar') }
  ];

  const menuItems = actions.length > 0 ? actions : defaultActions;

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="d-flex flex-column gap-2 mb-3"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="btn btn-secondary d-flex align-items-center gap-2"
                style={{
                  borderRadius: '12px',
                  padding: '0.75rem 1.25rem',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}
              >
                <item.icon size={18} />
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-primary"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-premium)',
          border: 'none'
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiPlus size={24} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
