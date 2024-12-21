import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredTvShows, setFilteredTvShows] = useState([]);
  const navigate = useNavigate();

  // Fetch Movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?api_key=be74b07f6707a2b11399ba580619ac41"
        );
        setMovies(response.data.results);
        setFilteredMovies(response.data.results); // Set initial filtered list
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  // Fetch TV Series
  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/tv?api_key=be74b07f6707a2b11399ba580619ac41"
        );
        setTvShows(response.data.results);
        setFilteredTvShows(response.data.results); // Set initial filtered list
      } catch (err) {
        console.error(err);
      }
    };

    fetchTvShows();
  }, []);

  // Handle Search for Movies and TV Series
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredMovies(movies);
      setFilteredTvShows(tvShows);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filteredMoviesList = movies.filter((movie) =>
        movie.title.toLowerCase().includes(lowerCaseSearch)
      );
      const filteredTvShowsList = tvShows.filter(
        (show) => show.name.toLowerCase().includes(lowerCaseSearch) // TV shows use `name` instead of `title`
      );
      setFilteredMovies(filteredMoviesList);
      setFilteredTvShows(filteredTvShowsList);
    }
  };

  const handleCardClick = (id, type) => {
    navigate(`/video/${type}/${id}`); // Differentiate between movie and TV series
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-center mb-8">Movies and TV Series</h1>

        {/* Movies Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition"
                onClick={() => handleCardClick(movie.id, "movie")}
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

        {/* TV Series Section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTvShows.map((show) => (
              <div
                key={show.id}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition"
                onClick={() => handleCardClick(show.id, "tv")}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="w-full h-80 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
