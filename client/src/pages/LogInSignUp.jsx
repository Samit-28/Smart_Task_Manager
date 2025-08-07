import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../api";

const LogInSignUp = () => {
  const [isLoginMode, setLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoginMode && password !== confirmPassword) {
      showErrorMessage("Passwords do not match");
      return;
    }

    const payload = isLoginMode
      ? { email, password }
      : { email, password, name };

    const url = isLoginMode
      ? `${API_URL}/api/auth/login`  
      : `${API_URL}/api/auth/signup`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        showErrorMessage(data.msg || data.error || 'Something went wrong');
        return;
      }

      if (isLoginMode) {
        localStorage.setItem('token', data.token);
        const token = localStorage.getItem('token');
        console.log("Token:", token); // token yaha sai dkeh laina wohi use karna
        showSuccessMessage(data.msg || 'Logged in successfully!');
        setTimeout(() => {
          navigate("/todo");
        }, 1500);
      } else {
        showSuccessMessage(data.msg || 'Signed up successfully!');
        setLoginMode(true);
      }

    } catch (err) {
      console.error(err);
      showErrorMessage("Server error");
    }
  };

  const showSuccessMessage = (msg) => {
  setSuccess(msg);
  setShowSuccess(true);
  setTimeout(() => setShowSuccess(false), 3000);
  };

  const showErrorMessage = (msg) => {
    setError(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-700 via-black to-gray-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="relative w-[430px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl text-white overflow-hidden">

      {/* Error Popup */}
      <div
        className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-600 text-white rounded shadow-md transition-all duration-500 ${
          showError ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
        }`}
      >
        {error}
      </div>

      {/* Success Popup */}
      <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-600 text-white rounded shadow-md transition-all duration-500 ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
        {success}
      </div>

      {/* Header */}
      <div className="flex justify-center mb-6 mt-6">
        <h2 className="text-3xl font-bold text-center">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>
      </div>

      {/* Tab Switch */}
      <div className="relative flex h-12 mb-8 border border-gray-700 rounded-full overflow-hidden">
        <button
          onClick={() => setLoginMode(true)}
          className={`w-1/2 z-10 text-sm sm:text-base font-medium transition-all duration-300 ${
            isLoginMode ? "text-white" : "text-gray-400"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setLoginMode(false)}
          className={`w-1/2 z-10 text-sm sm:text-base font-medium transition-all duration-300 ${
            !isLoginMode ? "text-white" : "text-gray-400"
          }`}
        >
          Signup
        </button>
        <div
          className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 transition-all duration-300 ${
            isLoginMode ? "left-0" : "left-1/2"
          }`}
        ></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLoginMode && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 text-white"
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          required
          autoComplete="current-username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 text-white"
        />

        {!isLoginMode && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 text-white"
          />
        )}

        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:opacity-90 text-white rounded-full text-lg font-semibold transition duration-300"
        >
          {isLoginMode ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setLoginMode(!isLoginMode)}
            className="text-cyan-500 hover:underline ml-1"
          >
            {isLoginMode ? "Signup Now" : "Login"}
          </button>
        </p>
      </form>
    </div>
    </div>
  );
};

export default LogInSignUp;