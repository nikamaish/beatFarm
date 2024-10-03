    import React, { useState } from 'react';
    import { HiMenuAlt4, HiX } from 'react-icons/hi';
    import { Link } from 'react-router-dom';

    const Header = ({ cartCount }) => {
      const [isOpen, setIsOpen] = useState(false);

      const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

      return (
        <header className="bg-light-brown text-dark-brown fixed w-full z-50 shadow-lg ">
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

            <div className="hidden md:block">
              <Link to='/signup'>
                <button className="bg-electric-blue text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                  Sign Up / Log In
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isOpen ? (
                  <HiX className="w-8 h-8 text-electric-blue" />
                ) : (
                  <HiMenuAlt4 className="w-8 h-8 text-electric-blue" />
                )}
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
              <Link to='/signup'>
                <button className="bg-electric-blue text-white px-6 py-2 rounded-full w-full hover:bg-blue-600 transition duration-300">
                  Sign Up / Log In
                </button>
              </Link>
            </nav>
          )}
        </header>
      );
    };

    export default Header;
