import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiUserCheck, FiUserX, FiUserPlus } from 'react-icons/fi';
import { useUsers } from '../context/UserContext';
import MetricCard from './MetricCard';

export const DashboardCards = () => {
  const { users } = useUsers();

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const inactiveUsers = users.filter(u => u.status === 'inactive').length;
  
  // Calculate new users registered in 2025/2026 or simply the last 2 registrations
  const newRegistrations = users.filter(u => {
    const regYear = new Date(u.registrationDate).getFullYear();
    return regYear >= 2025;
  }).length;

  const cardData = [
    {
      title: 'Total Ciudadanos',
      value: totalUsers,
      change: 12.5,
      trend: 'up',
      changeLabel: 'vs año anterior',
      icon: FiUsers,
      color: '#3B82F6'
    },
    {
      title: 'Ciudadanos Activos',
      value: activeUsers,
      change: ((activeUsers / (totalUsers || 1)) * 100).toFixed(1),
      trend: 'up',
      changeLabel: 'del total',
      icon: FiUserCheck,
      color: '#10B981'
    },
    {
      title: 'Registros Inactivos',
      value: inactiveUsers,
      change: ((inactiveUsers / (totalUsers || 1)) * 100).toFixed(1),
      trend: 'down',
      changeLabel: 'del total',
      icon: FiUserX,
      color: '#EF4444'
    },
    {
      title: 'Nuevos Registros (2025+)',
      value: newRegistrations,
      change: 8.3,
      trend: 'up',
      changeLabel: 'vs mes anterior',
      icon: FiUserPlus,
      color: '#F59E0B'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="row g-4">
      {cardData.map((card, idx) => (
        <div key={idx} className="col-12 col-sm-6 col-xl-3">
          <MetricCard {...card} delay={idx * 0.1} />
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
