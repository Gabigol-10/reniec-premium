import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ 
        background: 'var(--bg-primary)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }} />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* 404 Number with animation */}
              <motion.div
                animate={floatingAnimation}
                className="mb-4"
              >
                <h1 
                  className="display-1 fw-bold mb-0"
                  style={{
                    fontSize: 'clamp(5rem, 15vw, 10rem)',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 50%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.02em'
                  }}
                >
                  404
                </h1>
              </motion.div>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-4"
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'var(--accent-light)',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <FiAlertCircle size={36} style={{ color: 'var(--accent-color)' }} />
                </div>
              </motion.div>

              {/* Title and description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="fw-bold mb-3" style={{ fontSize: '1.75rem' }}>
                  Página no encontrada
                </h2>
                <p 
                  className="text-secondary mb-4"
                  style={{ 
                    fontSize: '1rem',
                    maxWidth: '500px',
                    margin: '0 auto 2rem'
                  }}
                >
                  Lo sentimos, la página que estás buscando no existe o ha sido movida. 
                  Verifica la URL o regresa al inicio.
                </p>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="d-flex gap-3 justify-content-center flex-wrap"
              >
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-secondary d-inline-flex align-items-center gap-2"
                  style={{ minWidth: '140px' }}
                >
                  <FiArrowLeft size={18} />
                  Volver atrás
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn btn-primary d-inline-flex align-items-center gap-2"
                  style={{ minWidth: '140px' }}
                >
                  <FiHome size={18} />
                  Ir al inicio
                </button>
              </motion.div>

              {/* Help text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-muted mt-5"
                style={{ fontSize: '0.875rem' }}
              >
                ¿Necesitas ayuda? Contacta al{' '}
                <span 
                  className="text-primary fw-semibold"
                  style={{ cursor: 'pointer' }}
                  onClick={() => alert('Función de soporte próximamente')}
                >
                  soporte técnico
                </span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
