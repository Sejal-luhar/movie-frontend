import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const OnlyMovies = () => {
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=be74b07f6707a2b11399ba580619ac41');
        setPopular(response.data.results);
        console.log(response.data);
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=be74b07f6707a2b11399ba580619ac41');
        setUpcoming(response.data.results);
        console.log(response.data);
        
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
    <div className="bg-black min-h-screen text-white">
        <Navbar/>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-yellow-100 text-center mb-8">Movies </h1>
        <div className="space-y-12">
          {/* Example Carousel */}
          <div>
            <h2 className="text-2xl text-yellow-100 font-bold mb-4">Popular</h2>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
              {popular.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 flex-shrink-0 w-60 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition"
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
          <div>
            <h2 className="text-2xl text-yellow-100 font-bold mb-4">Upcoming</h2>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
              {upcoming.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 flex-shrink-0 w-60 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition"
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
      </div>
    </div>
  );
};

export default OnlyMovies;
