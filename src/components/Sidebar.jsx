import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiUsers, FiLogOut, FiChevronsLeft, FiChevronsRight, FiBriefcase } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiGrid className="fs-5" /> },
    { path: '/users', label: 'Gestión Ciudadana', icon: <FiUsers className="fs-5" /> }
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? '80px' : '260px' }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="position-fixed top-0 bottom-0 start-0 z-3 border-end d-flex flex-column"
      style={{
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden'
      }}
    >
      {/* Sidebar Header */}
      <div className="d-flex align-items-center justify-content-between p-4 border-bottom" style={{ height: '70px', borderColor: 'var(--border-color)' }}>
        <div className="d-flex align-items-center gap-2 overflow-hidden">
          <div 
            className="rounded-3 bg-primary d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' }}
          >
            <span className="text-white fw-bold" style={{ fontSize: '0.9rem' }}>R</span>
          </div>
          {!collapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="fw-bold fs-6 text-primary tracking-wide text-nowrap"
            >
              RENIEC <span className="text-muted fw-medium" style={{ fontSize: '0.75rem' }}>Admin</span>
            </motion.span>
          )}
        </div>
        {!collapsed && (
          <button 
            onClick={() => setCollapsed(true)}
            className="btn btn-sm text-muted p-1 border-0 d-none d-lg-block hover-text-primary"
            style={{ background: 'transparent' }}
          >
            <FiChevronsLeft />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow-1 p-3 d-flex flex-column gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link d-flex align-items-center gap-3 ${isActive ? 'active' : ''}`
            }
            title={collapsed ? item.label : ''}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer (User / Logout) */}
      <div className="p-3 border-top d-flex flex-column gap-2" style={{ borderColor: 'var(--border-color)' }}>
        {user && (
          <div className={`d-flex align-items-center gap-3 ${collapsed ? 'justify-content-center' : 'p-2 rounded-3'}`} style={{ background: collapsed ? 'transparent' : 'var(--bg-tertiary)' }}>
            <img
              src={user.avatar}
              alt={user.fullName}
              className="rounded-circle border"
              style={{ width: '36px', height: '36px', objectFit: 'cover', borderColor: 'var(--border-color)' }}
            />
            {!collapsed && (
              <div className="overflow-hidden" style={{ minWidth: 0 }}>
                <p className="mb-0 fw-semibold text-primary text-truncate" style={{ fontSize: '0.85rem' }}>{user.fullName}</p>
                <p className="mb-0 text-muted text-truncate" style={{ fontSize: '0.7rem' }}>{user.email}</p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={logout}
          className="btn sidebar-link border-0 text-danger w-100 d-flex align-items-center gap-3"
          style={{ background: 'transparent', padding: '0.75rem 1rem' }}
          title={collapsed ? 'Cerrar Sesión' : ''}
        >
          <FiLogOut className="fs-5 text-danger flex-shrink-0" />
          {!collapsed && <span className="text-nowrap text-danger">Cerrar Sesión</span>}
        </button>

        {collapsed && (
          <button 
            onClick={() => setCollapsed(false)}
            className="btn btn-sm text-muted p-1 border-0 d-flex align-items-center justify-content-center mx-auto mt-2 hover-text-primary"
            style={{ background: 'transparent' }}
          >
            <FiChevronsRight className="fs-5" />
          </button>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
