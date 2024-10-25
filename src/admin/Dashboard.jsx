// src/Dashboard.js

import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Sidebar */}
      <div className="w-3/4 p-6"> {/* Main content area with 75% width */}
        <Outlet /> {/* Renders the current route component */}
      </div>
    </div>
  );
}

export default Dashboard;