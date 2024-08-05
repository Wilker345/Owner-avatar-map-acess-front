import React from 'react';
import { lazy, Suspense } from "react";
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'

import LoadingComponent from "@/components/LoadingComponent";
import { AuthProvider } from "@/contexts/AuthContext";
import OrientationForm from '@/pages/OrientationForm';
import ProtectedRoute from "@/pages/ProtectedRoute";
import queryClient from '@/components/queryClient';
import FormComponent from '@/pages/FormQuestion';
import QuestionForm from '@/pages/QuestionForm';
import Register from '@/components/Register';
import AnswerForm from '@/pages/AnswerForm';
import Login from '@/pages/Login';

const Form = lazy(() => import("@/pages/FormQuestion"));
const FormResponses = lazy(() => import("@/pages/FormResponses"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));

const App: React.FC = () => {
  return (
    <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Suspense fallback={<LoadingComponent />}>
                    <Routes>
                        <Route index element={<Login />}/>
                            <Route path="form" element={
                                <ProtectedRoute>
                                    <Form />
                                </ProtectedRoute>}/>
                            <Route path="formResponses" element={
                                <ProtectedRoute>
                                    <FormResponses />
                                </ProtectedRoute>
                                } />
                        <Route path="/" element={<Login />} />
                        <Route path="/form" element={<FormComponent />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="/questions/new" element={<QuestionForm />} />
                        <Route path="/answers/new" element={<AnswerForm />} />
                        <Route path="/orientation/new" element={<OrientationForm />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
          </QueryClientProvider>
    </AuthProvider>
  )
}

export default App;
