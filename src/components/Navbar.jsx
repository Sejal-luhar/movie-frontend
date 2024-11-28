import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the token
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className="bg-black text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/movies" className="hover:text-gray-400 text-3xl font-extrabold  text-red-700">
            MyFlix
          </Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/onlymovies"
            className="hover:text-gray-400 text-lg"
          >
            Movies
          </Link>
          <Link
            to="/tv-series"
            className="hover:text-gray-400 text-lg"
          >
            TV Series
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-gray-400 text-red-500 text-lg"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu (Hamburger) */}
        <div className="md:hidden">
          <button id="menu-btn" className="text-2xl focus:outline-none">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      <div id="mobile-menu" className=" md:hidden flex flex-col space-y-4 mt-4">
        <Link
          to="/movies"
          className="hover:text-gray-400 text-lg"
        >
          Movies
        </Link>
        <Link
          to="/tv-series"
          className="hover:text-gray-400 text-lg"
        >
          TV Series
        </Link>
        <button
          onClick={handleLogout}
          className="hover:text-gray-400 text-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
