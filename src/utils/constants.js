// Constantes de la aplicación

export const APP_NAME = 'RENIEC';
export const APP_DESCRIPTION = 'Sistema de Control y Gestión Ciudadana';

// Configuración de paginación
export const DEFAULT_PAGE_SIZE = 5;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

// Configuración de exportación
export const EXPORT_FILENAME = 'usuarios_reniec';
export const PDF_TITLE = 'Registro Nacional de Identificación y Estado Civil';

// Estados de usuario
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

export const USER_STATUS_LABELS = {
  active: 'Activo',
  inactive: 'Inactivo'
};

// Roles y permisos (para futuras expansiones)
export const USER_ROLES = {
  ADMIN: 'admin',
  OPERATOR: 'operator',
  VIEWER: 'viewer'
};

// Configuración de notificaciones
export const NOTIFICATION_DURATION = 5000; // 5 segundos
export const NOTIFICATION_POSITION = 'top-right';

// Validaciones
export const VALIDATION_RULES = {
  DNI_LENGTH: 8,
  PASSWORD_MIN_LENGTH: 6,
  PHONE_MIN_LENGTH: 9,
  NAME_MIN_LENGTH: 3
};

// Colores de estado
export const STATUS_COLORS = {
  active: {
    bg: 'rgba(16, 185, 129, 0.15)',
    color: '#10B981',
    border: 'rgba(16, 185, 129, 0.3)'
  },
  inactive: {
    bg: 'rgba(239, 68, 68, 0.15)',
    color: '#EF4444',
    border: 'rgba(239, 68, 68, 0.3)'
  }
};

// Formato de fecha
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';

// API endpoints (cuando se integre backend)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
export const API_ENDPOINTS = {
  USERS: '/users',
  AUTH: '/auth',
  STATS: '/stats'
};
