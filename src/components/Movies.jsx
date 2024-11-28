import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?api_key=be74b07f6707a2b11399ba580619ac41'
        );
        setMovies(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  const handleCardClick = (movieId) => {
    navigate(`/video/${movieId}`);
  };

  return (
    <div className="bg-black h-screen text-white overflow-hidden">
      <Navbar />
      <div className="container mx-auto p-4 h-full overflow-y-hidden">
        <h1 className="text-3xl text-center mb-8">Movies & Web Series</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition"
              onClick={() => handleCardClick(movie.id)}
            >
              <img
                src={`${import.meta.env.VITE_REACT_APP_APIURL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
