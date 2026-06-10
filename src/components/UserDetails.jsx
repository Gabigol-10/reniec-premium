import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiActivity, FiTag } from 'react-icons/fi';

export const UserDetails = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  // Calculate age from birthdate
  const calculateAge = (birthDateString) => {
    if (!birthDateString) return 'N/A';
    const birth = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} años`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="position-fixed top-0 bottom-0 start-0 end-0 z-4 bg-dark"
            style={{ backdropFilter: 'blur(4px)' }}
          />

          {/* Drawer sliding from the right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="position-fixed top-0 bottom-0 end-0 z-5 border-start shadow-premium d-flex flex-column"
            style={{
              width: '100%',
              maxWidth: '540px',
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
            }}
          >
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between p-4 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <h5 className="mb-0 fw-bold text-primary">Ficha Ciudadana Oficial</h5>
                <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>Detalle de identidad y estado de documento</p>
              </div>
              <button 
                type="button" 
                onClick={onClose}
                className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center p-2 border-0"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <FiX className="fs-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-4">
              
              {/* Profile Card Header */}
              <div className="glass-panel p-4 text-center position-relative overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center text-white fw-bold fs-3"
                  style={{
                    width: '72px',
                    height: '72px',
                    background: user.gender === 'F' 
                      ? 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)' 
                      : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)'
                  }}
                >
                  {user.fullName.split(' ').slice(0, 2).map(n => n[0]).join('')}
                </div>
                <h5 className="mb-1 text-primary fw-bold">{user.fullName}</h5>
                <span className="badge bg-primary-subtle text-primary mb-2" style={{ fontSize: '0.8rem' }}>DNI: {user.dni}</span>
                
                <div className="d-flex justify-content-center gap-2 mt-2">
                  <span className={`badge-status ${user.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                    <span 
                      className="d-inline-block rounded-circle me-1" 
                      style={{ 
                        width: '6px', 
                        height: '6px', 
                        backgroundColor: user.status === 'active' ? '#10B981' : '#EF4444' 
                      }}
                    />
                    {user.status === 'active' ? 'DNI Activo / Vigente' : 'DNI Inactivo / Restringido'}
                  </span>
                </div>
              </div>

              {/* Informative Grid */}
              <div className="d-flex flex-column gap-3">
                <h6 className="mb-1 text-muted fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                  Datos Personales y de Contacto
                </h6>
                
                <div className="row g-3">
                  {/* Birth Date */}
                  <div className="col-6">
                    <div className="p-3 rounded-3" style={{ background: 'var(--bg-tertiary)' }}>
                      <span className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>
                        <FiCalendar className="me-1" /> Fecha Nacimiento
                      </span>
                      <span className="fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>{user.birthDate}</span>
                    </div>
                  </div>

                  {/* Age */}
                  <div className="col-6">
                    <div className="p-3 rounded-3" style={{ background: 'var(--bg-tertiary)' }}>
                      <span className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>
                        <FiUser className="me-1" /> Edad / Sexo
                      </span>
                      <span className="fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>
                        {calculateAge(user.birthDate)} ({user.gender === 'M' ? 'Masc' : 'Fem'})
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-6">
                    <div className="p-3 rounded-3" style={{ background: 'var(--bg-tertiary)' }}>
                      <span className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>
                        <FiMail className="me-1" /> Correo Electrónico
                      </span>
                      <span className="fw-semibold text-primary text-truncate d-block" style={{ fontSize: '0.85rem' }} title={user.email}>
                        {user.email}
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="col-6">
                    <div className="p-3 rounded-3" style={{ background: 'var(--bg-tertiary)' }}>
                      <span className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>
                        <FiPhone className="me-1" /> Celular
                      </span>
                      <span className="fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>{user.phone}</span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="col-12">
                    <div className="p-3 rounded-3" style={{ background: 'var(--bg-tertiary)' }}>
                      <span className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>
                        <FiMapPin className="me-1" /> Domicilio Electoral y Región
                      </span>
                      <span className="fw-semibold text-primary d-block" style={{ fontSize: '0.85rem' }}>
                        {user.address}, <span className="text-muted">{user.department}</span>
                      </span>
                    </div>
                  </div>

                  {/* Registration Date */}
                  <div className="col-12">
                    <div className="p-3 rounded-3" style={{ background: 'var(--bg-tertiary)' }}>
                      <span className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>
                        <FiTag className="me-1" /> Fecha de Registro en el Sistema
                      </span>
                      <span className="fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>{user.registrationDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Citizen Activity Timeline Logs */}
              <div className="d-flex flex-column gap-3 mt-2">
                <h6 className="mb-1 text-muted fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                  Historial de Trámites y Modificaciones
                </h6>
                
                <div className="position-relative ps-4 d-flex flex-column gap-4" style={{ borderLeft: '2px solid var(--border-color)' }}>
                  {user.activityLog && user.activityLog.map((log, index) => (
                    <div key={log.id || index} className="position-relative">
                      {/* Timeline dot */}
                      <span 
                        className="position-absolute rounded-circle d-flex align-items-center justify-content-center text-white"
                        style={{
                          left: '-31px',
                          top: '2px',
                          width: '14px',
                          height: '14px',
                          backgroundColor: index === 0 ? 'var(--accent-color)' : 'var(--text-muted)',
                          border: '2px solid var(--bg-secondary)',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      />
                      
                      <div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>{log.action}</span>
                          <span className="text-muted" style={{ fontSize: '0.7rem' }}>{log.date}</span>
                        </div>
                        <p className="mb-0 text-muted" style={{ fontSize: '0.8rem' }}>
                          {log.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserDetails;
