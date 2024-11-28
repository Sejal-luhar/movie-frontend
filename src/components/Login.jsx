import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      alert(response.data.message); // Show success message
      localStorage.setItem('authToken', response.data.token);

      navigate('/movies'); // Redirect to movies page
    } catch (error) {
      alert('Login failed! Please check your credentials.');
    }
  };
  
  

  return (
    <div className="h-screen flex justify-center items-center bg-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-red-600 text-white py-2 rounded">Login</button>
        </form>
        <p className="text-center mt-4">
          New to the app?{' '}
          <Link to="/signup" className="text-red-600 underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
