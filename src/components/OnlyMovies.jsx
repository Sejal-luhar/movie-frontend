import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const OnlyMovies = () => {
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [filteredPopular, setFilteredPopular] = useState([]);
  const [filteredUpcoming, setFilteredUpcoming] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=be74b07f6707a2b11399ba580619ac41'
        );
        setPopular(response.data.results);
        setFilteredPopular(response.data.results); // Set initial filtered list
      } catch (err) {
        console.error(err);
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=be74b07f6707a2b11399ba580619ac41'
        );
        setUpcoming(response.data.results);
        setFilteredUpcoming(response.data.results); // Set initial filtered list
      } catch (err) {
        console.error(err);
      }
    };

    fetchUpcomingMovies();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredPopular(popular);
      setFilteredUpcoming(upcoming);
    } else {
      const searchLower = searchTerm.toLowerCase();
      setFilteredPopular(
        popular.filter((movie) => movie.title.toLowerCase().includes(searchLower))
      );
      setFilteredUpcoming(
        upcoming.filter((movie) => movie.title.toLowerCase().includes(searchLower))
      );
    }
  };

  const handleCardClick = (movieId) => {
    navigate(`/video/movie/${movieId}`);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Pass handleSearch to Navbar */}
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-yellow-100 text-center mb-8">Movies</h1>
        <div className="space-y-12">
          {/* Popular Movies Section */}
          <div>
            <h2 className="text-2xl text-yellow-100 font-bold mb-4">Popular</h2>
            <div className="flex overflow-x-auto overflow-y-hidden space-x-4">
              {filteredPopular.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 flex-shrink-0 w-60 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition"
                  onClick={() => handleCardClick(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Movies Section */}
          <div>
            <h2 className="text-2xl text-yellow-100 font-bold mb-4">Upcoming</h2>
            <div className="flex overflow-x-auto overflow-y-hidden space-x-4">
              {filteredUpcoming.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 flex-shrink-0 w-60 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition"
                  onClick={() => handleCardClick(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlyMovies;
