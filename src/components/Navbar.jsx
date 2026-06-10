import React, { useState } from 'react';
import { FiBell, FiMenu, FiChevronDown, FiUser, FiLogOut, FiActivity } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';
import ThemeSwitcher from './ThemeSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const { logs } = useUsers();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getLogIcon = (type) => {
    switch (type) {
      case 'create':
        return <span className="badge rounded-circle p-1 bg-success-subtle text-success"><FiActivity style={{ fontSize: '10px' }} /></span>;
      case 'delete':
        return <span className="badge rounded-circle p-1 bg-danger-subtle text-danger"><FiActivity style={{ fontSize: '10px' }} /></span>;
      case 'update':
      default:
        return <span className="badge rounded-circle p-1 bg-primary-subtle text-primary"><FiActivity style={{ fontSize: '10px' }} /></span>;
    }
  };

  return (
    <header 
      className="position-fixed top-0 end-0 z-2 d-flex align-items-center justify-content-between px-4 border-bottom"
      style={{
        height: '70px',
        left: sidebarCollapsed ? '80px' : '260px',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: 'var(--border-color)',
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Left side */}
      <div className="d-flex align-items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="btn text-muted p-1 border-0 hover-text-primary"
          style={{ background: 'transparent' }}
          aria-label="Toggle Sidebar"
        >
          <FiMenu className="fs-4" />
        </button>
        <span className="fw-semibold text-primary d-none d-sm-inline" style={{ fontSize: '1.05rem' }}>
          Sistema de Control Ciudadano
        </span>
      </div>

      {/* Right side */}
      <div className="d-flex align-items-center gap-3">
        <ThemeSwitcher />

        {/* Notifications (Bell Dropdown) */}
        <div className="position-relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="btn rounded-circle d-flex align-items-center justify-content-center p-2 border-0 position-relative"
            style={{
              width: '40px',
              height: '40px',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              transition: 'background-color 0.2s',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <FiBell className="fs-5" />
            {logs.length > 0 && (
              <span 
                className="position-absolute top-2 end-2 bg-danger border border-2 border-light rounded-circle"
                style={{ width: '10px', height: '10px' }}
              />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="position-fixed top-0 bottom-0 start-0 end-0 z-1" onClick={() => setShowNotifications(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="dropdown-menu show position-absolute end-0 mt-2 p-0 z-2 glass-panel"
                  style={{ width: '320px', border: '1px solid var(--border-color)' }}
                >
                  <div className="p-3 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="fw-semibold text-primary" style={{ fontSize: '0.9rem' }}>Actividad Administrativa</span>
                    <span className="badge bg-primary-subtle text-primary" style={{ fontSize: '0.75rem' }}>{logs.length} Log(s)</span>
                  </div>
                  <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                    {logs.length === 0 ? (
                      <div className="p-4 text-center text-muted" style={{ fontSize: '0.85rem' }}>
                        No hay actividad reciente
                      </div>
                    ) : (
                      logs.slice(0, 5).map((log) => (
                        <div key={log.id} className="p-3 border-bottom d-flex gap-2 align-items-start hover-bg-tertiary" style={{ borderColor: 'var(--border-color)', transition: 'background 0.2s' }}>
                          <div className="mt-1">{getLogIcon(log.type)}</div>
                          <div style={{ minWidth: 0 }}>
                            <p className="mb-0 fw-medium text-primary text-truncate" style={{ fontSize: '0.8rem' }}>{log.user}</p>
                            <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>{log.action}</p>
                            <span className="text-muted" style={{ fontSize: '0.65rem' }}>{log.date}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Dropdown */}
        {user && (
          <div className="position-relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="btn d-flex align-items-center gap-2 border-0 p-1"
              style={{ background: 'transparent' }}
            >
              <img
                src={user.avatar}
                alt={user.fullName}
                className="rounded-circle border"
                style={{ width: '36px', height: '36px', objectFit: 'cover', borderColor: 'var(--border-color)' }}
              />
              <span className="d-none d-md-inline fw-medium text-primary text-truncate" style={{ maxWidth: '120px', fontSize: '0.9rem' }}>
                {user.fullName}
              </span>
              <FiChevronDown className="text-muted fs-6" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <>
                  <div className="position-fixed top-0 bottom-0 start-0 end-0 z-1" onClick={() => setShowProfileMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="dropdown-menu show position-absolute end-0 mt-2 p-1 z-2 glass-panel"
                    style={{ width: '200px', border: '1px solid var(--border-color)' }}
                  >
                    <div className="p-2 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                      <p className="mb-0 fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>{user.fullName}</p>
                      <p className="mb-0 text-muted text-truncate" style={{ fontSize: '0.7rem' }}>{user.role}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="dropdown-item d-flex align-items-center gap-2 text-danger mt-1 rounded-2 border-0 w-100 text-start"
                      style={{ background: 'transparent' }}
                    >
                      <FiLogOut />
                      <span>Cerrar Sesión</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
