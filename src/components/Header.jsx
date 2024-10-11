import React, { useState, useContext } from 'react';
import { HiMenuAlt4, HiX, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // If AuthContext is in 'contexts' folder
import UserProfile from './UserProfile';

const Header = ({ cartCount }) => {
  const { authToken, logout } = useContext(AuthContext); // Use AuthContext
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-light-brown text-dark-brown fixed w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-3xl font-bold">
          <Link to='/'>
            <span className="text-electric-blue">Beat</span> Farm
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link to='' className="text-lg hover:text-electric-blue transition duration-300 ease-in-out">All Beats</Link>
          <Link to='' className="text-lg hover:text-electric-blue transition duration-300 ease-in-out">Free Beats</Link>
          <Link to='' className="text-lg hover:text-electric-blue transition duration-300 ease-in-out">Premium Beats</Link>
          <Link to='' className="text-lg hover:text-electric-blue transition duration-300 ease-in-out">License Info</Link>
          <Link to='' className="text-lg hover:text-electric-blue transition duration-300 ease-in-out">FAQ</Link>
          <Link to='/contact' className="text-lg hover:text-electric-blue transition duration-300 ease-in-out">Contact</Link>
          <Link to='/cart' className="text-lg hover:text-electric-blue transition duration-300 ease-in-out">Cart {cartCount}</Link>
          <Link to='/history' className="text-lg hover:text-electric-blue transition duration-300 ease-in-out">History</Link>
        </nav>

        {/* Sign Up / Log In / Logout Button */}
        <div className="hidden md:block relative">
          {authToken ? ( // Show Logout if logged in
            // <button onClick={logout} className="bg-electric-blue text-white px-6 py-2 rounded-full w-full hover:bg-blue-600 transition duration-300">
            //   <UserProfile/>
            // </button>
            <UserProfile/>
          ) : (
            <button onClick={toggleDropdown} className="flex items-center bg-electric-blue text-white px-6 py-2 rounded-full w-full hover:bg-blue-600 transition duration-300">
              Sign Up / Sign In
              {dropdownOpen ? <HiChevronUp className="ml-2" /> : <HiChevronDown className="ml-2" />}
            </button>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && !authToken && ( // Show dropdown only if not logged in
            <div className="absolute right-0 bottom-0 transform translate-y-full bg-white shadow-lg rounded-md z-50 w-full">
              <Link to='/signup' className="block px-4 py-2 text-dark-brown hover:bg-light-brown transition duration-300">User</Link>
              <Link to='/artistsignup' className="block px-4 py-2 text-dark-brown hover:bg-light-brown transition duration-300">Artist</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <HiX className="w-8 h-8 text-electric-blue" /> : <HiMenuAlt4 className="w-8 h-8 text-electric-blue" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="bg-light-brown md:hidden p-4 text-center space-y-2">
          <Link to='' className="block text-lg hover:text-electric-blue transition duration-300 ease-in-out">All Beats</Link>
          <Link to='' className="block text-lg hover:text-electric-blue transition duration-300 ease-in-out">Free Beats</Link>
          <Link to='' className="block text-lg hover:text-electric-blue transition duration-300 ease-in-out">Premium Beats</Link>
          <Link to='' className="block text-lg hover:text-electric-blue transition duration-300 ease-in-out">License Info</Link>
          <Link to='' className="block text-lg hover:text-electric-blue transition duration-300 ease-in-out">FAQ</Link>
          <Link to='/contact' className="block text-lg hover:text-electric-blue transition duration-300 ease-in-out">Contact</Link>
          <Link to='/cart' className="block text-lg hover:text-electric-blue transition duration-300 ease-in-out">Cart {cartCount}</Link>
          <Link to='/history' className="block text-lg hover:text-electric-blue transition duration-300 ease-in-out">History</Link>

          {/* Mobile Sign Up / Log In Button */}
          <div className="relative">
            {authToken ? ( // Mobile Logout button
              <button onClick={logout} className="bg-electric-blue text-white px-6 py-2 rounded-full w-full hover:bg-blue-600 transition duration-300">
                Logout
              </button>
            ) : (
              <button onClick={toggleDropdown} className="flex items-center bg-electric-blue text-white px-6 py-2 rounded-full w-full hover:bg-blue-600 transition duration-300">
                Sign Up / Sign In
                {dropdownOpen ? <HiChevronUp className="ml-2" /> : <HiChevronDown className="ml-2" />}
              </button>
            )}

            {/* Mobile Dropdown Menu */}
            {dropdownOpen && !authToken && ( // Show dropdown only if not logged in
              <div className="absolute right-0 bottom-0 transform translate-y-full bg-white shadow-lg rounded-md z-50 w-full">
                <Link to='/signup' className="block px-4 py-2 text-dark-brown hover:bg-light-brown transition duration-300">User</Link>
                <Link to='/artistsignup' className="block px-4 py-2 text-dark-brown hover:bg-light-brown transition duration-300">Artist</Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
