import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const TvSeries = () => {
  const [tvData, setTvData] = useState({
    airingToday: [],
    topRated: [],
    onTheAir: [],
    popular: [],
  });
  const [filteredData, setFilteredData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Add the navigate hook

  useEffect(() => {
    const fetchTvData = async () => {
      try {
        const apiKey = 'be74b07f6707a2b11399ba580619ac41';
        const endpoints = {
          airingToday: `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`,
          topRated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`,
          onTheAir: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}`,
          popular: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`,
        };

        const [airingToday, topRated, onTheAir, popular] = await Promise.all(
          Object.values(endpoints).map((url) => axios.get(url))
        );

        const data = {
          airingToday: airingToday.data.results,
          topRated: topRated.data.results,
          onTheAir: onTheAir.data.results,
          popular: popular.data.results,
        };

        setTvData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching TV series data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTvData();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredData(tvData);
    } else {
      const filterCategory = (category) =>
        category.filter((item) =>
          (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

      setFilteredData({
        airingToday: filterCategory(tvData.airingToday),
        topRated: filterCategory(tvData.topRated),
        onTheAir: filterCategory(tvData.onTheAir),
        popular: filterCategory(tvData.popular),
      });
    }
  };

  // Handle card click to navigate to the video page
  const handleCardClick = (id) => {
    navigate(`/video/tv-series/${id}`);
  };

  const Carousel = ({ title, data }) => (
    <div className="mb-12">
      <h2 className="text-2xl text-yellow-100 font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 flex-shrink-0 w-60 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition"
              onClick={() => handleCardClick(item.id)}  // Add the onClick event
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.name || 'No Title'}
                className="w-full h-80 object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400">No data available</p>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex justify-center items-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-yellow-100 text-center mb-8">TV Series</h1>
        <Carousel title="Airing Today" data={filteredData.airingToday} />
        <Carousel title="Top Rated" data={filteredData.topRated} />
        <Carousel title="On the Air" data={filteredData.onTheAir} />
        <Carousel title="Popular" data={filteredData.popular} />
      </div>
    </div>
  );
};

export default TvSeries;
