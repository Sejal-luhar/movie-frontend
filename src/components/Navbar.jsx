import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location/path

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token
    navigate("/login"); // Redirect to login
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass the search term to the parent component
  };

  // Check if we're on a movie or tv details page to hide the search bar
  const isVideoPage =
    location.pathname.includes("/movie/") ||
    location.pathname.includes("/tv/") ||
    location.pathname.includes("/tv-series/");

  return (
    <nav className="bg-black text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link
            to="/movies"
            className="hover:text-gray-400 text-3xl font-extrabold text-red-700"
          >
            MyFlix
          </Link>
        </div>

        {/* Conditionally render the Search Bar */}
        {!isVideoPage && (
          <div className="flex items-center  space-x-4">
            <input
              type="text"
              placeholder="Search Movies or TV...."
              value={searchTerm}
              onChange={handleSearch}
              className="bg-gray-800 text-white rounded-2xl px-8 py-2 outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
        )}

        {/* Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/movies" className="hover:text-gray-400 text-lg">
            Home
          </Link>
          <Link to="/onlymovies" className="hover:text-gray-400 text-lg">
            Movies
          </Link>
          <Link to="/tv-series" className="hover:text-gray-400 text-lg">
            TV Series
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-gray-400 text-red-500 text-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
