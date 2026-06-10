import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { useUsers } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export const StatisticsChart = () => {
  const { users } = useUsers();
  const { isDarkMode } = useTheme();

  // Dynamic colors depending on theme
  const textColor = isDarkMode ? '#94A3B8' : '#475569';
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(148, 163, 184, 0.1)';

  // Process data for Status distribution
  const activeCount = users.filter(u => u.status === 'active').length;
  const inactiveCount = users.filter(u => u.status === 'inactive').length;

  const statusData = {
    labels: ['Activos', 'Inactivos'],
    datasets: [
      {
        data: [activeCount, inactiveCount],
        backgroundColor: [
          'rgba(16, 185, 129, 0.85)', // active - green
          'rgba(239, 68, 68, 0.85)'   // inactive - red
        ],
        borderColor: isDarkMode ? '#0F172A' : '#FFFFFF',
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  const statusOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
          font: { family: 'Plus Jakarta Sans', size: 12, weight: '500' },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
        titleColor: isDarkMode ? '#F8FAFC' : '#0F172A',
        bodyColor: isDarkMode ? '#94A3B8' : '#475569',
        borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5
      }
    }
  };

  // Process data for Registrations Trend over months
  // Group users by registration month (chronologically)
  const getMonthsData = () => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const counts = new Array(12).fill(0);
    
    users.forEach(user => {
      if (user.registrationDate) {
        const dateObj = new Date(user.registrationDate);
        if (!isNaN(dateObj)) {
          const monthIdx = dateObj.getMonth();
          counts[monthIdx]++;
        }
      }
    });

    // Let's filter to display last 6 months dynamically or full year. Let's do full year.
    return { labels: months, data: counts };
  };

  const monthInfo = getMonthsData();

  const trendData = {
    labels: monthInfo.labels,
    datasets: [
      {
        fill: true,
        label: 'Registros',
        data: monthInfo.data,
        borderColor: '#3B82F6', // accent bright blue
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        borderWidth: 3,
        tension: 0.35,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: isDarkMode ? '#0B0F19' : '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
        titleColor: isDarkMode ? '#F8FAFC' : '#0F172A',
        bodyColor: isDarkMode ? '#94A3B8' : '#475569',
        borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: textColor,
          font: { family: 'Plus Jakarta Sans', size: 11 }
        }
      },
      y: {
        grid: {
          color: gridColor
        },
        ticks: {
          color: textColor,
          font: { family: 'Plus Jakarta Sans', size: 11 },
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="row g-4">
      {/* Line Chart */}
      <div className="col-12 col-lg-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-panel p-4 h-100"
          style={{ background: 'var(--glass-bg)' }}
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h5 className="mb-0 fw-bold text-primary" style={{ fontSize: '1.05rem' }}>Tendencia de Inscripción</h5>
              <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>Número de ciudadanos registrados por mes</p>
            </div>
            <span className="badge bg-primary-subtle text-primary py-1.5 px-2.5 rounded-2" style={{ fontSize: '0.75rem' }}>Anual</span>
          </div>
          <div style={{ height: '300px' }}>
            <Line data={trendData} options={trendOptions} />
          </div>
        </motion.div>
      </div>

      {/* Doughnut Chart */}
      <div className="col-12 col-lg-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-panel p-4 h-100"
          style={{ background: 'var(--glass-bg)' }}
        >
          <div>
            <h5 className="mb-0 fw-bold text-primary" style={{ fontSize: '1.05rem' }}>Estado de Documentación</h5>
            <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>Distribución de registros de DNI</p>
          </div>
          <div className="mt-4 position-relative d-flex align-items-center justify-content-center" style={{ height: '230px' }}>
            <Doughnut data={statusData} options={statusOptions} />
            <div className="position-absolute text-center" style={{ pointerEvents: 'none' }}>
              <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Total</span>
              <span className="fw-bold text-primary" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}>{users.length}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StatisticsChart;
