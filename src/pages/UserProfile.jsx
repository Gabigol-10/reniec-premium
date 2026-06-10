import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiUser, FiMail, FiPhone, FiMapPin, FiActivity, FiTag, FiAlertCircle } from 'react-icons/fi';
import { useUsers } from '../context/UserContext';

export const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserById } = useUsers();

  const user = useMemo(() => getUserById(id), [id, getUserById]);

  if (!user) {
    return (
      <div className="text-center py-5">
        <FiAlertCircle className="text-danger fs-1 mb-3" />
        <h4 className="fw-bold text-primary">Ciudadano No Encontrado</h4>
        <p className="text-muted mb-4">El identificador ingresado no corresponde a ningún registro activo de DNI.</p>
        <Link to="/users" className="btn btn-primary">
          Volver a Gestión Ciudadana
        </Link>
      </div>
    );
  }

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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="d-flex flex-column gap-4"
    >
      {/* Header & Back Button */}
      <div className="d-flex align-items-center gap-3">
        <button
          onClick={() => navigate('/users')}
          className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center p-2 border-0"
          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', width: '38px', height: '38px' }}
          title="Regresar"
        >
          <FiArrowLeft className="fs-5" />
        </button>
        <div>
          <h3 className="fw-bold text-primary mb-0">Ficha Técnica Individual</h3>
          <p className="text-secondary mb-0" style={{ fontSize: '0.825rem' }}>Perfil único del padrón electoral nacional</p>
        </div>
      </div>

      {/* Profile Summary Card & Details Grid */}
      <div className="row g-4">
        {/* Left Column: Avatar & Quick Info Card */}
        <div className="col-12 col-lg-4">
          <div className="glass-panel p-4 text-center h-100" style={{ background: 'var(--glass-bg)' }}>
            <div 
              className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center text-white fw-bold fs-2"
              style={{
                width: '90px',
                height: '90px',
                background: user.gender === 'F' 
                  ? 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)' 
                  : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {user.fullName.split(' ').slice(0, 2).map(n => n[0]).join('')}
            </div>
            
            <h4 className="fw-bold text-primary mb-1">{user.fullName}</h4>
            <span className="badge bg-primary-subtle text-primary mb-3 py-1.5 px-2.5 rounded-2" style={{ fontSize: '0.85rem' }}>
              DNI: {user.dni}
            </span>

            <div className="d-flex justify-content-center mt-2">
              <span className={`badge-status ${user.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                <span 
                  className="d-inline-block rounded-circle me-1" 
                  style={{ 
                    width: '6px', 
                    height: '6px', 
                    backgroundColor: user.status === 'active' ? '#10B981' : '#EF4444' 
                  }}
                />
                {user.status === 'active' ? 'DNI Activo / Vigente' : 'DNI Inactivo / Suspendido'}
              </span>
            </div>

            <hr className="my-4" style={{ borderColor: 'var(--border-color)' }} />

            <div className="text-start d-flex flex-column gap-3">
              <div>
                <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Fecha de Registro</span>
                <span className="fw-semibold text-primary" style={{ fontSize: '0.875rem' }}>{user.registrationDate}</span>
              </div>
              <div>
                <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Región del Ciudadano</span>
                <span className="fw-semibold text-primary" style={{ fontSize: '0.875rem' }}>{user.department || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Personal sheet & Log timeline */}
        <div className="col-12 col-lg-8">
          <div className="d-flex flex-column gap-4">
            
            {/* Details Card */}
            <div className="glass-panel p-4" style={{ background: 'var(--glass-bg)' }}>
              <h5 className="fw-bold text-primary mb-4">Información Civil Registrada</h5>
              
              <div className="row g-4">
                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <FiCalendar className="text-primary mt-1 fs-5" />
                    <div>
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Fecha de Nacimiento</span>
                      <span className="fw-semibold text-primary" style={{ fontSize: '0.9rem' }}>{user.birthDate}</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <FiUser className="text-primary mt-1 fs-5" />
                    <div>
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Edad y Sexo</span>
                      <span className="fw-semibold text-primary" style={{ fontSize: '0.9rem' }}>
                        {calculateAge(user.birthDate)} ({user.gender === 'M' ? 'Masculino' : 'Femenino'})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <FiMail className="text-primary mt-1 fs-5" />
                    <div>
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Correo Electrónico</span>
                      <span className="fw-semibold text-primary text-break" style={{ fontSize: '0.9rem' }}>{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <FiPhone className="text-primary mt-1 fs-5" />
                    <div>
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Teléfono Celular</span>
                      <span className="fw-semibold text-primary" style={{ fontSize: '0.9rem' }}>{user.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex align-items-start gap-3">
                    <FiMapPin className="text-primary mt-1 fs-5" />
                    <div>
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Domicilio Procesal Electoral</span>
                      <span className="fw-semibold text-primary" style={{ fontSize: '0.9rem' }}>
                        {user.address}, <span className="text-muted">{user.department}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline logs Card */}
            <div className="glass-panel p-4" style={{ background: 'var(--glass-bg)' }}>
              <h5 className="fw-bold text-primary mb-4">
                <FiActivity className="me-2 text-primary" /> Historial de Trámites
              </h5>
              
              <div className="position-relative ps-4 d-flex flex-column gap-4" style={{ borderLeft: '2px solid var(--border-color)' }}>
                {user.activityLog && user.activityLog.map((log, index) => (
                  <div key={log.id || index} className="position-relative">
                    <span 
                      className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
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
                        <span className="fw-semibold text-primary" style={{ fontSize: '0.875rem' }}>{log.action}</span>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>{log.date}</span>
                      </div>
                      <p className="mb-0 text-secondary" style={{ fontSize: '0.825rem' }}>
                        {log.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
