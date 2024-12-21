import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import Navbar from "./Navbar";

const VideoPage = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [videoKey, setVideoKey] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch movie details
        const detailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=be74b07f6707a2b11399ba580619ac41`
        );
        setMovieDetails(detailsResponse.data);

        // Fetch movie videos
        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=be74b07f6707a2b11399ba580619ac41`
        );
        const videos = videoResponse.data.results;
        const trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        setVideoKey(trailer ? trailer.key : null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovieData();
  }, [id]);

  if (!movieDetails) {
    return (
      <div className="text-center text-white mt-20">
        Loading movie details...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen ">
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          {movieDetails.title}
        </h1>
        <p className="text-lg text-gray-300 mb-6 text-center">
          {movieDetails.overview}
        </p>
        <div className="flex justify-center mb-12">
          {videoKey ? (
            <YouTube
              videoId={videoKey}
              opts={{
                height: "480",
                width: "100%",
                objectFit: "cover",
                playerVars: { autoplay: 1 },
              }}
              className="w-full md:w-3/4 lg:w-2/3"
            />
          ) : (
            <p className="text-gray-400">
              No trailer available for this movie.
            </p>
          )}
        </div>
        <div className="flex justify-around text-gray-400">
          <div>
            <h3 className="text-xl font-semibold">Release Date</h3>
            <p>{movieDetails.release_date}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Language</h3>
            <p>{movieDetails.original_language.toUpperCase()}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Rating</h3>
            <p>{movieDetails.vote_average} / 10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
