import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading status
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the login request starts
    try {
      const response = await api.post("/auth/login", { email, password });
      alert(response.data.message); // Show success message
      localStorage.setItem("authToken", response.data.token);

      navigate("/movies"); // Redirect to movies page
    } catch (error) {
      alert("Login failed! Please check your credentials.");
    } finally {
      setLoading(false); // Reset loading state after the request
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-[50%]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 rounded-3xl border border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 rounded-3xl border border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 font-semibold text-white px-4 py-3 rounded-3xl my-4"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v4m0 0l-3-3m3 3l3-3M4 12h4m0 0l-3 3m3-3l-3-3m8 0h4m0 0l-3 3m3-3l-3-3"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-center mt-4">
          New to the app?{" "}
          <Link to="/signup" className="text-red-600 underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
