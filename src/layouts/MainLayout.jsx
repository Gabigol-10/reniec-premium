import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="layout-wrapper">
      {/* Collapsible Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main viewport area */}
      <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
        {/* Navigation bar */}
        <Navbar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

        {/* Content workspace outlet */}
        <main className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
