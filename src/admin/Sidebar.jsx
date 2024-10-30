// src/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-1/4 bg-gray-800 text-white p-4 mt-16 h-screen"> {/* Use h-screen for full height */}
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      <Link to="/admin/plans" className="block py-2 px-4 hover:bg-gray-700 rounded">Plans</Link>
      <Link to="/admin/artists" className="block py-2 px-4 hover:bg-gray-700 rounded">Artists</Link>
      <Link to="/admin/genres" className="block py-2 px-4 hover:bg-gray-700 rounded">Genres</Link>
      <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700 rounded">Users</Link>
      <Link to="/admin/request" className="block py-2 px-4 hover:bg-gray-700 rounded">Request</Link>

      {/* Add other sidebar links as needed */}
    </div>
  );
}

export default Sidebar;
