import React, { lazy, Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingComponent from '@/components/LoadingComponent';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/pages/ProtectedRoute';
import queryClient from '@/components/queryClient';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import QuestionForm from '@/pages/QuestionForm';
import AnswerForm from '@/pages/AnswerForm';
import OrientationForm from '@/pages/OrientationForm';

const Form = lazy(() => import('@/pages/FormQuestion'));
const FormResponses = lazy(() => import('@/pages/FormResponses'));
const PageNotFound = lazy(() => import('@/pages/PageNotFound'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<LoadingComponent />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/form" element={
                <ProtectedRoute>
                  <Form />
                </ProtectedRoute>
              }/>
              <Route path="/formResponses" element={
                <ProtectedRoute>
                  <FormResponses />
                </ProtectedRoute>
              }/>
              <Route path="/questions/new" element={
                <ProtectedRoute>
                  <QuestionForm />
                </ProtectedRoute>
              }/>
              <Route path="/answers/new" element={
                <ProtectedRoute>
                  <AnswerForm />
                </ProtectedRoute>
              }/>
              <Route path="/orientation/new" element={
                <ProtectedRoute>
                  <OrientationForm />
                </ProtectedRoute>
              }/>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
