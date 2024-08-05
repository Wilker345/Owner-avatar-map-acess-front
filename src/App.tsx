import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import Login from '@/components/Login';
import FormComponent from '@/components/FormComponent';
import queryClient from '@/components/queryClient';
import Register from '@/components/Register';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/form" element={<FormComponent />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
