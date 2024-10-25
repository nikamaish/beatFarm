// src/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-1/4 bg-gray-800 text-white p-4 h-full"> {/* Adjusted width to 25% */}
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      <Link to="/admin/plans" className="block py-2 px-4 hover:bg-gray-700 rounded">Plans</Link>
      <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700 rounded">Users</Link>
      {/* Add other sidebar links as needed */}
    </div>
  );
}

export default Sidebar;