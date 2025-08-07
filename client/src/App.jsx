import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LogInSignUp from './pages/LogInSignUp';
import Todo from './pages/Todo';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Login & Signup */}
        <Route path="/login" element={<LogInSignUp />} />
        {/* Dashboard/Todo page */}
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
