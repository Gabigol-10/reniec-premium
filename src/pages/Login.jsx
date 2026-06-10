import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle, FiLogIn, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export const Login = () => {
  const { login } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!email) {
      tempErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'El correo electrónico no es válido.';
    }

    if (!password) {
      tempErrors.password = 'La contraseña es obligatoria.';
    } else if (password.length < 6) {
      tempErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulated network delay for premium SaaS feeling
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = login(email, password, remember);

    if (result.success) {
      addNotification('Sesión iniciada con éxito. Bienvenido al portal.', 'success');
      navigate('/dashboard');
    } else {
      setErrors({ form: result.message });
      addNotification(result.message, 'error');
    }

    setIsLoading(false);
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center min-vh-100 px-3 py-5"
      style={{
        background: 'radial-gradient(circle at 10% 20%, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.99) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Blur Spheres */}
      <div 
        className="position-absolute" 
        style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%)',
          top: '-10%',
          left: '-10%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        className="position-absolute" 
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 70%)',
          bottom: '-15%',
          right: '-5%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-100 z-1"
        style={{ maxWidth: '440px' }}
      >
        {/* Brand Logo & Intro */}
        <div className="text-center mb-4">
          <div 
            className="rounded-4 mx-auto d-flex align-items-center justify-content-center mb-3"
            style={{ 
              width: '54px', 
              height: '54px', 
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
            }}
          >
            <span className="text-white fw-extrabold fs-4">R</span>
          </div>
          <h4 className="fw-bold text-white mb-1">RENIEC</h4>
          <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
            Plataforma de Control y Gestión Ciudadana
          </p>
        </div>

        {/* Login Form Panel */}
        <div className="glass-panel p-4 p-sm-5" style={{ background: 'rgba(15, 23, 42, 0.55)', borderColor: 'rgba(255, 255, 255, 0.06)' }}>
          <h5 className="fw-bold text-white mb-1">Acceso Administrativo</h5>
          <p className="text-secondary mb-4" style={{ fontSize: '0.85rem' }}>
            Ingrese sus credenciales registradas para continuar.
          </p>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* General form errors */}
            {errors.form && (
              <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 border-0 rounded-3 text-danger mb-0" style={{ background: 'rgba(239, 68, 68, 0.12)', fontSize: '0.85rem' }}>
                <FiAlertCircle className="flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="form-label text-secondary fw-medium mb-1.5" style={{ fontSize: '0.8rem' }}>Correo Electrónico</label>
              <div className="position-relative">
                <FiMail className="position-absolute top-50 start-3 translate-middle-y text-muted" />
                <input
                  type="email"
                  className={`form-control ps-5 ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="admin@reniec.pe"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => { const n = { ...prev }; delete n.email; return n; });
                  }}
                  disabled={isLoading}
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', borderColor: 'rgba(255,255,255,0.08)' }}
                />
                {errors.email && (
                  <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                    <FiAlertCircle /> {errors.email}
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="form-label text-secondary fw-medium mb-1.5" style={{ fontSize: '0.8rem' }}>Contraseña</label>
              <div className="position-relative">
                <FiLock className="position-absolute top-50 start-3 translate-middle-y text-muted" />
                <input
                  type="password"
                  className={`form-control ps-5 ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => { const n = { ...prev }; delete n.password; return n; });
                  }}
                  disabled={isLoading}
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', borderColor: 'rgba(255,255,255,0.08)' }}
                />
                {errors.password && (
                  <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                    <FiAlertCircle /> {errors.password}
                  </div>
                )}
              </div>
            </div>

            {/* Remember session checkbox */}
            <div className="form-check d-flex align-items-center justify-content-between mt-1 mb-2">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  className="form-check-input"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="form-check-label text-secondary" style={{ fontSize: '0.825rem', cursor: 'pointer' }}>
                  Recordar sesión
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2.5 d-flex align-items-center justify-content-center gap-2 fw-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <span>Ingresar al Sistema</span>
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo credentials notice */}
        <div className="mt-4 p-3 rounded-3 text-center" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <p className="mb-1 text-secondary" style={{ fontSize: '0.75rem' }}>
            <span className="text-warning fw-bold">Modo de Demostración:</span>
          </p>
          <p className="mb-0 text-muted" style={{ fontSize: '0.725rem' }}>
            Usuario: <strong className="text-white">admin@reniec.pe</strong> • Contraseña: <strong className="text-white">admin123</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
