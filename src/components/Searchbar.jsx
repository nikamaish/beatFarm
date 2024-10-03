import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Searchbar = () => {
    return (
        <div className="search-bar-container rounded-lg bg-white w-full py-4 px-2 shadow-lg flex justify-center items-center">
            <div className="flex w-full max-w-xl items-center">
                <div className="flex w-full max-w-lg">
                    <input
                        type="text"
                        placeholder="Search for beats, artists, or genres..."
                        className="w-full py-1 px-2 border border-gray-300 rounded-l-md text-dark-brown placeholder-dark-brown focus:outline-none"
                        style={{ color: '#4A3728' }} // Dark Brown text
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 px-2 rounded-r-md"
                        style={{ backgroundColor: '#00A4E4', padding: '10px 8px' }} // Blue accent for search icon
                    >
                        <FaSearch className="text-white" />
                    </button>
                </div>

                <Link to="/guide" className="ml-2 text-blue-500 hover:text-blue-700 whitespace-nowrap">Quick guide to search</Link>
            </div>
        </div>
    );
};

export default Searchbar;
