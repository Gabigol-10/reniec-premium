import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme}
      className="btn rounded-circle d-flex align-items-center justify-content-center p-2 border-0"
      style={{
        width: '40px',
        height: '40px',
        background: 'var(--bg-tertiary)',
        color: 'var(--text-primary)',
        transition: 'background-color 0.2s, color 0.2s',
        boxShadow: 'var(--shadow-sm)'
      }}
      aria-label="Toggle theme"
      type="button"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {isDarkMode ? (
          <FiSun className="fs-5 text-warning" />
        ) : (
          <FiMoon className="fs-5 text-primary" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeSwitcher;
