import React from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiUserPlus, FiUserMinus, FiRefreshCw, FiCalendar, FiClock } from 'react-icons/fi';
import DashboardCards from '../components/DashboardCards';
import StatisticsChart from '../components/StatisticsChart';
import { useUsers } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();
  const { logs } = useUsers();

  const getLogTypeStyling = (type) => {
    switch (type) {
      case 'create':
        return {
          icon: <FiUserPlus className="text-success" />,
          bg: 'rgba(16, 185, 129, 0.1)',
          label: 'Nuevo Ciudadano'
        };
      case 'delete':
        return {
          icon: <FiUserMinus className="text-danger" />,
          bg: 'rgba(239, 68, 68, 0.1)',
          label: 'Inactivación'
        };
      case 'update':
      default:
        return {
          icon: <FiRefreshCw className="text-primary" />,
          bg: 'rgba(59, 130, 246, 0.1)',
          label: 'Actualización'
        };
    }
  };

  const getGreetings = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Buenos días';
    if (hr < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const formattedDate = new Date().toLocaleDateString('es-PE', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="d-flex flex-column gap-4"
    >
      {/* Welcome / Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          <h2 className="fw-bold text-primary mb-1 tracking-tight">
            {getGreetings()}, {user?.fullName || 'Administrador'}
          </h2>
          <p className="text-secondary mb-0" style={{ fontSize: '0.875rem' }}>
            Aquí tienes el resumen del Sistema Nacional de Registro de Identidad.
          </p>
        </div>

        {/* Date display pill */}
        <div 
          className="glass-panel py-2 px-3.5 d-inline-flex align-items-center gap-2"
          style={{ 
            background: 'var(--glass-bg)', 
            borderColor: 'var(--border-color)',
            fontSize: '0.85rem'
          }}
        >
          <FiCalendar className="text-primary" />
          <span className="text-secondary fw-semibold">{formattedDate}</span>
        </div>
      </div>

      {/* KPI Cards section */}
      <section aria-label="Indicadores clave">
        <DashboardCards />
      </section>

      {/* Charts Section */}
      <section aria-label="Gráficos de estadísticas">
        <StatisticsChart />
      </section>

      {/* Bottom Area: Recent Activity & Reminders */}
      <div className="row g-4">
        {/* Recent Activity Log list */}
        <div className="col-12 col-xl-7">
          <div className="glass-panel p-4 h-100" style={{ background: 'var(--glass-bg)' }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h5 className="mb-0 fw-bold text-primary" style={{ fontSize: '1.05rem' }}>
                  <FiActivity className="me-2 text-primary" /> Actividad Reciente
                </h5>
                <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>
                  Últimas operaciones realizadas por el personal administrativo
                </p>
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
              {logs.length === 0 ? (
                <div className="p-5 text-center text-muted" style={{ fontSize: '0.9rem' }}>
                  No se registran actividades en el sistema.
                </div>
              ) : (
                logs.slice(0, 4).map((log) => {
                  const style = getLogTypeStyling(log.type);
                  return (
                    <div 
                      key={log.id} 
                      className="d-flex align-items-center justify-content-between p-3 rounded-3 hover-bg-tertiary"
                      style={{ 
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        transition: 'background 0.2s, border-color 0.2s'
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-3 p-2.5 d-flex align-items-center justify-content-center"
                          style={{ background: style.bg }}
                        >
                          {style.icon}
                        </div>
                        <div>
                          <h6 className="mb-0.5 fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>
                            {log.user}
                          </h6>
                          <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>
                            {log.action}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-end d-flex align-items-center gap-1.5 text-muted" style={{ fontSize: '0.7rem' }}>
                        <FiClock />
                        <span>{log.date}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* System Health / Regulatory notes panel */}
        <div className="col-12 col-xl-5">
          <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between" style={{ background: 'var(--glass-bg)' }}>
            <div>
              <h5 className="mb-2 fw-bold text-primary" style={{ fontSize: '1.05rem' }}>
                Cumplimiento y Regulaciones RENIEC
              </h5>
              <p className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Todos los cambios realizados en el sistema son auditados en tiempo real según la Ley Nº 26497 (Ley Orgánica del Registro Nacional de Identificación y Estado Civil). La alteración indebida de datos de identidad constituye un delito federal grave.
              </p>
            </div>
            
            <div className="p-3.5 rounded-3 mt-3" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-semibold text-primary" style={{ fontSize: '0.8rem' }}>Estado del Servidor Central</span>
                <span className="badge-status badge-active">Operativo</span>
              </div>
              <div className="d-flex align-items-center justify-content-between" style={{ fontSize: '0.75rem' }}>
                <span className="text-muted">Última sincronización</span>
                <span className="fw-semibold text-primary">Hace 2 minutos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
