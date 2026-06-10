import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiSave, FiAlertCircle } from 'react-icons/fi';
import { useUsers } from '../context/UserContext';
import { useNotifications } from '../context/NotificationContext';

export const UserForm = ({ isOpen, onClose, userToEdit }) => {
  const { createUser, updateUser } = useUsers();
  const { addNotification } = useNotifications();

  // Initial form values
  const initialFormState = {
    dni: '',
    fullName: '',
    email: '',
    phone: '',
    status: 'active',
    address: '',
    department: 'Lima',
    gender: 'M',
    birthDate: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state when editing a user
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        dni: userToEdit.dni || '',
        fullName: userToEdit.fullName || '',
        email: userToEdit.email || '',
        phone: userToEdit.phone || '',
        status: userToEdit.status || 'active',
        address: userToEdit.address || '',
        department: userToEdit.department || 'Lima',
        gender: userToEdit.gender || 'M',
        birthDate: userToEdit.birthDate || ''
      });
      setErrors({});
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [userToEdit, isOpen]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error on change
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Form Validations
  const validateForm = () => {
    const tempErrors = {};

    // DNI: 8 digits exact
    if (!formData.dni) {
      tempErrors.dni = 'El DNI es obligatorio.';
    } else if (!/^\d{8}$/.test(formData.dni)) {
      tempErrors.dni = 'El DNI debe tener exactamente 8 números.';
    }

    // Name: letters and spaces, min length
    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'El nombre completo es obligatorio.';
    } else if (formData.fullName.trim().length < 5) {
      tempErrors.fullName = 'Debe ingresar nombre y apellido completo.';
    }

    // Email
    if (!formData.email) {
      tempErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      tempErrors.email = 'Correo electrónico no válido.';
    }

    // Phone: Peruvian format (starts with 9, 9 digits)
    if (!formData.phone) {
      tempErrors.phone = 'El teléfono es obligatorio.';
    } else if (!/^9\d{8}$/.test(formData.phone)) {
      tempErrors.phone = 'El teléfono debe iniciar con 9 y tener 9 dígitos.';
    }

    // BirthDate
    if (!formData.birthDate) {
      tempErrors.birthDate = 'La fecha de nacimiento es obligatoria.';
    } else {
      const birth = new Date(formData.birthDate);
      const today = new Date();
      if (birth >= today) {
        tempErrors.birthDate = 'La fecha de nacimiento no puede ser futura.';
      }
    }

    // Address
    if (!formData.address.trim()) {
      tempErrors.address = 'El domicilio es obligatorio.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      addNotification('Por favor, corrija los errores en el formulario.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate saving delay for a premium SaaS loading effect
    await new Promise(resolve => setTimeout(resolve, 800));

    let result;
    if (userToEdit) {
      result = updateUser(userToEdit.id, formData);
      if (result.success) {
        addNotification('Ciudadano actualizado con éxito.', 'success');
        onClose();
      } else {
        setErrors({ dni: result.message });
        addNotification(result.message, 'error');
      }
    } else {
      result = createUser(formData);
      if (result.success) {
        addNotification('Nuevo ciudadano registrado con éxito.', 'success');
        onClose();
      } else {
        setErrors({ dni: result.message });
        addNotification(result.message, 'error');
      }
    }

    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="position-fixed top-0 bottom-0 start-0 end-0 z-4 bg-dark"
            style={{ backdropFilter: 'blur(4px)' }}
          />

          {/* Sliding panel drawer */}
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
                <h5 className="mb-0 fw-bold text-primary">
                  {userToEdit ? 'Editar Ciudadano' : 'Inscribir Ciudadano'}
                </h5>
                <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>
                  {userToEdit ? 'Modifique los datos del registro nacional.' : 'Registre un nuevo ciudadano en la base de datos nacional.'}
                </p>
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

            {/* Form Fields body */}
            <form onSubmit={handleSubmit} className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3">
              {/* DNI */}
              <div>
                <label className="form-label fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>Número de DNI</label>
                <input 
                  type="text" 
                  name="dni"
                  maxLength="8"
                  disabled={!!userToEdit} // Lock DNI during edit representing official state regulation
                  className={`form-control ${errors.dni ? 'is-invalid' : ''}`}
                  placeholder="Ingrese 8 dígitos numéricos"
                  value={formData.dni}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, ''); // numbers only
                    setFormData(prev => ({ ...prev, dni: val }));
                  }}
                />
                {errors.dni && (
                  <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                    <FiAlertCircle /> {errors.dni}
                  </div>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="form-label fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>Nombre Completo</label>
                <input 
                  type="text" 
                  name="fullName"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  placeholder="Nombres y apellidos"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                    <FiAlertCircle /> {errors.fullName}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="form-label fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>Correo Electrónico</label>
                <input 
                  type="email" 
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                    <FiAlertCircle /> {errors.email}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="form-label fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>Teléfono Celular</label>
                <input 
                  type="text" 
                  name="phone"
                  maxLength="9"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  placeholder="9XXXXXXXX (9 dígitos)"
                  value={formData.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, ''); // numbers only
                    setFormData(prev => ({ ...prev, phone: val }));
                  }}
                />
                {errors.phone && (
                  <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                    <FiAlertCircle /> {errors.phone}
                  </div>
                )}
              </div>

              <div className="row g-3">
                {/* Birth Date */}
                <div className="col-12 col-sm-6">
                  <label className="form-label fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>Fecha de Nacimiento</label>
                  <input 
                    type="date" 
                    name="birthDate"
                    className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                  {errors.birthDate && (
                    <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                      <FiAlertCircle /> {errors.birthDate}
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div className="col-12 col-sm-6">
                  <label className="form-label fw-semibold text-primary d-block mb-2" style={{ fontSize: '0.85rem' }}>Sexo</label>
                  <div className="d-flex gap-4 mt-2">
                    <div className="form-check">
                      <input 
                        type="radio" 
                        name="gender" 
                        id="genderM" 
                        value="M" 
                        className="form-check-input"
                        checked={formData.gender === 'M'}
                        onChange={handleChange} 
                      />
                      <label htmlFor="genderM" className="form-check-label text-primary">Masculino</label>
                    </div>
                    <div className="form-check">
                      <input 
                        type="radio" 
                        name="gender" 
                        id="genderF" 
                        value="F" 
                        className="form-check-input"
                        checked={formData.gender === 'F'}
                        onChange={handleChange} 
                      />
                      <label htmlFor="genderF" className="form-check-label text-primary">Femenino</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                {/* Region Department */}
                <div className="col-12 col-sm-6">
                  <label className="form-label fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>Departamento</label>
                  <select 
                    name="department"
                    className="form-select"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="Lima">Lima</option>
                    <option value="Arequipa">Arequipa</option>
                    <option value="Cusco">Cusco</option>
                    <option value="La Libertad">La Libertad</option>
                    <option value="Piura">Piura</option>
                    <option value="Lambayeque">Lambayeque</option>
                    <option value="Ica">Ica</option>
                    <option value="Junín">Junín</option>
                    <option value="Loreto">Loreto</option>
                    <option value="Ancash">Áncash</option>
                  </select>
                </div>

                {/* Status */}
                <div className="col-12 col-sm-6">
                  <label className="form-label fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>Estado de DNI</label>
                  <select 
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Activo / Vigente</option>
                    <option value="inactive">Inactivo / Suspendido</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="form-label fw-semibold text-primary" style={{ fontSize: '0.85rem' }}>Domicilio Procesal / Dirección</label>
                <input 
                  type="text" 
                  name="address"
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  placeholder="Av. Calle, Nro, Urb/Distrito"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                    <FiAlertCircle /> {errors.address}
                  </div>
                )}
              </div>

              {/* Actions Button Footer inside drawer */}
              <div className="d-flex gap-3 mt-4 border-top pt-4" style={{ borderColor: 'var(--border-color)' }}>
                <button 
                  type="button" 
                  onClick={onClose}
                  className="btn btn-secondary flex-fill py-2.5"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary flex-fill py-2.5 d-flex align-items-center justify-content-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <FiSave />
                      <span>{userToEdit ? 'Actualizar DNI' : 'Registrar Ciudadano'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserForm;
