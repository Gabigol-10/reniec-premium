import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <div
            className="rounded-4 mx-auto d-flex align-items-center justify-content-center"
            style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
            }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="text-white fw-extrabold"
              style={{ fontSize: '1.75rem' }}
            >
              R
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h5 className="fw-bold mb-2">Cargando RENIEC</h5>
          <div className="d-flex align-items-center justify-content-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent-color)'
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
