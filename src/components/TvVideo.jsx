import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import Navbar from './Navbar';

const TvVideo = () => {
  const { id } = useParams(); // Extract the series ID from the route
  const [videoKey, setVideoKey] = useState(null);
  const [seriesDetails, setSeriesDetails] = useState(null);

  useEffect(() => {
    // Fetch TV series details and video
    const fetchVideo = async () => {
      try {
        // Fetch series details
        const detailsResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=be74b07f6707a2b11399ba580619ac41`
        );
        setSeriesDetails(detailsResponse.data);

        // Fetch series videos
        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=be74b07f6707a2b11399ba580619ac41`
        );

        const trailer = videosResponse.data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );

        if (trailer) {
          setVideoKey(trailer.key); // Set YouTube video key
        } else {
          console.warn('No trailer available for this series.');
        }
      } catch (err) {
        console.error('Failed to fetch TV series details or video:', err);
      }
    };

    fetchVideo();
  }, [id]);

  return (
    <div className="bg-black text-white min-h-screen ">
      <Navbar />
      {seriesDetails ? (
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">{seriesDetails.name}</h1>
          <p className="mb-6">{seriesDetails.overview}</p>
          {videoKey ? (
            <YouTube
              videoId={videoKey}
              opts={{
                height: '480',
                width: '100%',
                playerVars: { autoplay: 1 },
              }}
            />
          ) : (
            <p className="text-gray-400">No trailer available for this series.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-400">Loading series details...</p>
      )}
    </div>
  );
};

export default TvVideo;
