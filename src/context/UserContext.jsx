import React, { createContext, useState, useEffect, useContext } from 'react';
import { initialUsers, initialLogs } from '../data/mockData';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('reniec-users');
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });

  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem('reniec-logs');
    return savedLogs ? JSON.parse(savedLogs) : initialLogs;
  });

  useEffect(() => {
    localStorage.setItem('reniec-users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('reniec-logs', JSON.stringify(logs));
  }, [logs]);

  // Log an admin action
  const addLog = (userFullName, action, type) => {
    const newLog = {
      id: `log-${Date.now()}`,
      user: userFullName,
      action: action,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      type: type // 'create' | 'update' | 'delete'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Create User
  const createUser = (userData) => {
    // Check if DNI already exists
    if (users.some(u => u.dni === userData.dni)) {
      return { success: false, message: `El DNI ${userData.dni} ya se encuentra registrado.` };
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString().split('T')[0],
      activityLog: [
        {
          id: `act-${Date.now()}`,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          action: "Registro Inicial",
          details: "Registro creado por el administrador."
        }
      ]
    };

    setUsers(prev => [newUser, ...prev]);
    addLog(newUser.fullName, "Registro Inicial", "create");
    return { success: true, user: newUser };
  };

  // Update User
  const updateUser = (id, updatedData) => {
    // Check DNI uniqueness except self
    if (users.some(u => u.dni === updatedData.dni && u.id !== id)) {
      return { success: false, message: `El DNI ${updatedData.dni} ya está en uso por otro ciudadano.` };
    }

    let changedUser = null;

    setUsers(prev => prev.map(user => {
      if (user.id === id) {
        const changes = [];
        if (user.status !== updatedData.status) changes.push(`Estado a ${updatedData.status}`);
        if (user.email !== updatedData.email) changes.push("Correo");
        if (user.phone !== updatedData.phone) changes.push("Teléfono");
        if (user.address !== updatedData.address) changes.push("Domicilio");
        
        const changeDetails = changes.length > 0 ? `Modificó: ${changes.join(', ')}` : "Actualización de datos";

        const newLogEntry = {
          id: `act-${Date.now()}`,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          action: "Actualización de Datos",
          details: changeDetails
        };

        changedUser = {
          ...user,
          ...updatedData,
          activityLog: [newLogEntry, ...user.activityLog]
        };

        return changedUser;
      }
      return user;
    }));

    if (changedUser) {
      addLog(changedUser.fullName, "Actualización de Datos", "update");
    }

    return { success: true, user: changedUser };
  };

  // Delete User
  const deleteUser = (id) => {
    const userToDelete = users.find(user => user.id === id);
    if (!userToDelete) {
      return { success: false, message: "Ciudadano no encontrado." };
    }

    setUsers(prev => prev.filter(user => user.id !== id));
    addLog(userToDelete.fullName, "Suspensión / Eliminación de Registro", "delete");
    return { success: true };
  };

  // Get User Details
  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };

  return (
    <UserContext.Provider value={{
      users,
      logs,
      createUser,
      updateUser,
      deleteUser,
      getUserById
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
