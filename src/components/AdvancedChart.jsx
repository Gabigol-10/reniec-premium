import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AdvancedChart = ({ type = 'line', data, options, title, subtitle }) => {
  const [chartType, setChartType] = useState(type);

  const components = {
    line: Line,
    bar: Bar,
    doughnut: Doughnut
  };

  const ChartComponent = components[chartType] || Line;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-panel p-4"
      style={{ background: 'var(--glass-bg)' }}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h5 className="mb-1 fw-bold" style={{ fontSize: '1.1rem' }}>
            {title}
          </h5>
          {subtitle && (
            <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Chart type switcher */}
        <div 
          className="btn-group btn-group-sm"
          role="group"
        >
          {['line', 'bar'].map((t) => (
            <button
              key={t}
              type="button"
              className={`btn ${chartType === t ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setChartType(t)}
              style={{
                fontSize: '0.75rem',
                padding: '0.35rem 0.75rem',
                textTransform: 'capitalize'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={chartType}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ChartComponent data={data} options={options} />
      </motion.div>
    </motion.div>
  );
};

export default AdvancedChart;
