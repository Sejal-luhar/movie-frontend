import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Movies from './components/Movies';
import Videos from './components/Video';
import ProtectedRoute from './components/ProtectedRoute';
import OnlyMovies from './components/OnlyMovies';
import TvSeries from './components/TvSeries';
import TvVideo from './components/TvVideo';
import GradientBackground from './components/GradientBackground'; // New wrapper component

const App = () => {
  return (
    <GradientBackground>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video/:id"
          element={
            <ProtectedRoute>
              <Videos />
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
        <Route
          path="/tv-video/:id"
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
