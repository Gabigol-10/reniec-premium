import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiFilter, FiChevronDown, FiChevronUp, 
  FiChevronLeft, FiChevronRight, FiEye, FiEdit2, FiTrash2,
  FiFileText, FiDownload
} from 'react-icons/fi';
import { useUsers } from '../context/UserContext';
import { exportToExcel, exportToPDF } from '../utils/exportUtils';
import EmptyState from './EmptyState';

export const UserTable = ({ onView, onEdit, onDelete }) => {
  const { users } = useUsers();
  
  // States for search, filtering, sorting, and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('fullName');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handles column header sorting clicks
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filtered and Sorted Users list memo
  const processedUsers = useMemo(() => {
    let result = [...users];

    // 1. Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(u => 
        u.fullName.toLowerCase().includes(term) ||
        u.dni.includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.phone.includes(term)
      );
    }

    // 2. Status filter
    if (statusFilter !== 'all') {
      result = result.filter(u => u.status === statusFilter);
    }

    // 3. Sorting logic
    result.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination bounds
  const totalPages = Math.ceil(processedUsers.length / itemsPerPage);
  
  const paginatedUsers = useMemo(() => {
    // Reset page if bounds exceed
    const startIdx = (currentPage - 1) * itemsPerPage;
    return processedUsers.slice(startIdx, startIdx + itemsPerPage);
  }, [processedUsers, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Render Sort Icon
  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <FiChevronUp className="ms-1" /> : <FiChevronDown className="ms-1" />;
  };

  return (
    <div className="d-flex flex-column gap-3">
      {/* Control Bar: Search, Filter, Exports */}
      <div className="row g-3 align-items-center">
        {/* Search */}
        <div className="col-12 col-md-5 col-lg-6">
          <div className="position-relative">
            <FiSearch 
              className="position-absolute top-50 start-3 translate-middle-y text-muted" 
              style={{ fontSize: '1rem' }} 
            />
            <input 
              type="text" 
              className="form-control ps-5 py-2.5" 
              placeholder="Buscar por DNI, nombre, correo o teléfono..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to page 1
              }}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="col-12 col-sm-6 col-md-3 col-lg-3">
          <div className="position-relative">
            <FiFilter className="position-absolute top-50 start-3 translate-middle-y text-muted" />
            <select 
              className="form-select ps-5 py-2.5"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">Todos los Estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
        </div>

        {/* Export Dropdown */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-end gap-2">
          <button 
            onClick={() => exportToExcel(processedUsers)}
            className="btn btn-secondary py-2.5 px-3 flex-fill d-flex align-items-center justify-content-center gap-2"
            title="Exportar a Excel"
          >
            <FiDownload />
            <span>Excel</span>
          </button>
          <button 
            onClick={() => exportToPDF(processedUsers)}
            className="btn btn-secondary py-2.5 px-3 flex-fill d-flex align-items-center justify-content-center gap-2"
            title="Exportar a PDF"
          >
            <FiFileText />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Main Table Panel */}
      <div className="glass-panel p-0 overflow-hidden" style={{ background: 'var(--glass-bg)' }}>
        <div className="table-responsive">
          <table className="custom-table table-hover">
            <thead>
              <tr>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('dni')}>
                  <div className="d-flex align-items-center">DNI {renderSortIcon('dni')}</div>
                </th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('fullName')}>
                  <div className="d-flex align-items-center">Nombre Completo {renderSortIcon('fullName')}</div>
                </th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('email')}>
                  <div className="d-flex align-items-center">Correo {renderSortIcon('email')}</div>
                </th>
                <th>Teléfono</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('status')}>
                  <div className="d-flex align-items-center">Estado {renderSortIcon('status')}</div>
                </th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('registrationDate')}>
                  <div className="d-flex align-items-center">Registro {renderSortIcon('registrationDate')}</div>
                </th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="border-0 p-0">
                      <EmptyState
                        icon={searchTerm || statusFilter !== 'all' ? 'search' : 'users'}
                        title={searchTerm || statusFilter !== 'all' ? 'Sin resultados' : 'No hay usuarios'}
                        description={
                          searchTerm || statusFilter !== 'all'
                            ? 'No se encontraron ciudadanos que coincidan con los filtros aplicados.'
                            : 'Aún no hay usuarios registrados en el sistema.'
                        }
                        compact
                      />
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user, idx) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.03, duration: 0.2 }}
                    >
                      <td>
                        <span className="font-monospace fw-semibold text-primary">{user.dni}</span>
                      </td>
                      <td>
                        <div className="fw-semibold text-primary">{user.fullName}</div>
                        <small className="text-muted d-block d-sm-none">{user.email}</small>
                      </td>
                      <td>
                        <span className="text-secondary">{user.email}</span>
                      </td>
                      <td>
                        <span className="text-secondary">{user.phone}</span>
                      </td>
                      <td>
                        <span className={`badge-status ${user.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                          <span 
                            className="d-inline-block rounded-circle me-1" 
                            style={{ 
                              width: '6px', 
                              height: '6px', 
                              backgroundColor: user.status === 'active' ? '#10B981' : '#EF4444' 
                            }}
                          />
                          {user.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary" style={{ fontSize: '0.85rem' }}>{user.registrationDate}</span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onView(user)}
                            className="btn btn-sm p-1.5 text-primary border-0 rounded-2"
                            style={{ background: 'var(--bg-tertiary)' }}
                            title="Ver detalle"
                          >
                            <FiEye className="fs-6" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onEdit(user)}
                            className="btn btn-sm p-1.5 text-warning border-0 rounded-2"
                            style={{ background: 'var(--bg-tertiary)' }}
                            title="Editar ciudadano"
                          >
                            <FiEdit2 className="fs-6" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onDelete(user)}
                            className="btn btn-sm p-1.5 text-danger border-0 rounded-2"
                            style={{ background: 'var(--bg-tertiary)' }}
                            title="Eliminar registro"
                          >
                            <FiTrash2 className="fs-6" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Table Footer: Pagination */}
        {totalPages > 1 && (
          <div className="p-3 border-top d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3" style={{ borderColor: 'var(--border-color)' }}>
            <span className="text-muted" style={{ fontSize: '0.85rem' }}>
              Mostrando del <span className="fw-medium text-primary">{((currentPage - 1) * itemsPerPage) + 1}</span> al{' '}
              <span className="fw-medium text-primary">
                {Math.min(currentPage * itemsPerPage, processedUsers.length)}
              </span>{' '}
              de <span className="fw-medium text-primary">{processedUsers.length}</span> ciudadanos
            </span>

            <div className="d-flex align-items-center gap-1">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-sm p-2 border-0 rounded-2 d-flex align-items-center justify-content-center"
                style={{ background: 'var(--bg-tertiary)', opacity: currentPage === 1 ? 0.5 : 1 }}
              >
                <FiChevronLeft />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className="btn btn-sm px-3 py-2 border-0 rounded-2 fw-medium"
                  style={{
                    backgroundColor: currentPage === page ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                    color: currentPage === page ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all 0.2s'
                  }}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-sm p-2 border-0 rounded-2 d-flex align-items-center justify-content-center"
                style={{ background: 'var(--bg-tertiary)', opacity: currentPage === totalPages ? 0.5 : 1 }}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
