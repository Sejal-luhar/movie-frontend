import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OnlyMovies from "./components/OnlyMovies";
import TvSeries from "./components/TvSeries";
import Movies from "./components/Movies";
import TvVideo from "./components/TvVideo";
import VideoPage from "./components/Video";
import ProtectedRoute from "./components/ProtectedRoute";
import GradientBackground from "./components/GradientBackground"; // Wrapper component

const App = () => {
  return (
    <GradientBackground>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onlymovies"
          element={
            <ProtectedRoute>
              <OnlyMovies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tv-series"
          element={
            <ProtectedRoute>
              <TvSeries />
            </ProtectedRoute>
          }
        />

        {/* Video Details Route */}
        <Route
          path="/video/:type/:id" // Dynamic route for both movies and TV series
          element={
            <ProtectedRoute>
              <VideoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video/tv-series/:id" // Dynamic route for both movies and TV series
          element={
            <ProtectedRoute>
              <TvVideo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </GradientBackground>
  );
};

export default App;
