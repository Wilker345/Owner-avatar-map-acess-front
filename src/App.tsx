import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import Login from '@/components/Login';
import FormComponent from '@/components/FormComponent';
import queryClient from '@/components/queryClient';
import Register from '@/components/Register';
import './App.css'
import { BrowserRouter, Navigate } from "react-router-dom";

import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import LoadingComponent from "@/components/LoadingComponent";
import ProtectedRoute from "@/pages/ProtectedRoute";


const Form = lazy(() => import("@/pages/Form"));
const FormResponses = lazy(() => import("@/pages/FormResponses"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

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
                    </Routes>
                </Suspense>
            </BrowserRouter>
          </QueryClientProvider>
    </AuthProvider>
  )
}

export default App;
