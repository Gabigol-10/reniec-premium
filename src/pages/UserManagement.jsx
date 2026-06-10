import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUserPlus, FiUsers, FiAlertTriangle } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useUsers } from '../context/UserContext';
import { useNotifications } from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import UserDetails from '../components/UserDetails';

export const UserManagement = () => {
  const { deleteUser } = useUsers();
  const { addNotification } = useNotifications();
  const { isDarkMode } = useTheme();

  // Drawer open states and active records state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  // Triggering the add drawer
  const handleAddClick = () => {
    setUserToEdit(null);
    setIsFormOpen(true);
  };

  // Triggering the edit drawer
  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsFormOpen(true);
  };

  // Triggering the view drawer
  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  // Confirming and deleting with SweetAlert2
  const handleDeleteClick = (user) => {
    Swal.fire({
      title: '¿Confirmar suspensión?',
      text: `Esta acción invalidará la vigencia electoral y civil del DNI de ${user.fullName}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, invalidar registro',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'swal2-popup glass-panel',
        confirmButton: 'btn btn-danger py-2 px-3',
        cancelButton: 'btn btn-secondary py-2 px-3 me-2'
      },
      buttonsStyling: false,
      background: isDarkMode ? '#0F172A' : '#FFFFFF',
      color: isDarkMode ? '#F8FAFC' : '#0F172A',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = deleteUser(user.id);
        if (res.success) {
          addNotification(`DNI de ${user.fullName} suspendido del sistema.`, 'warning');
          Swal.fire({
            title: 'Registro suspendido',
            text: 'El ciudadano ha sido dado de baja en los registros del padrón.',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary py-2 px-3'
            },
            buttonsStyling: false,
            background: isDarkMode ? '#0F172A' : '#FFFFFF',
            color: isDarkMode ? '#F8FAFC' : '#0F172A',
          });
        } else {
          addNotification(res.message, 'error');
        }
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="d-flex flex-column gap-4"
    >
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
        <div>
          <h2 className="fw-bold text-primary mb-1 tracking-tight">
            Gestión de Ciudadanos
          </h2>
          <p className="text-secondary mb-0" style={{ fontSize: '0.875rem' }}>
            Base de datos unificada de identidad nacional (DNI).
          </p>
        </div>

        {/* Add Citizen Trigger */}
        <button 
          onClick={handleAddClick}
          className="btn btn-primary py-2.5 px-4 d-flex align-items-center justify-content-center gap-2 fw-semibold"
          type="button"
        >
          <FiUserPlus className="fs-5" />
          <span>Inscribir Ciudadano</span>
        </button>
      </div>

      {/* Main Table component wrapper */}
      <section aria-label="Base de datos de ciudadanos">
        <UserTable 
          onView={handleViewClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </section>

      {/* Slide-over Form Drawer (Create / Edit) */}
      <UserForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        userToEdit={userToEdit}
      />

      {/* Slide-over Details Drawer */}
      <UserDetails 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        user={selectedUser}
      />
    </motion.div>
  );
};

export default UserManagement;
