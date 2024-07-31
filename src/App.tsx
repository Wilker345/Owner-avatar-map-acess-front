import './App.css'
import { lazy, Suspense } from "react";
import { FormComponent } from "@/components/FormComponent"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LoadingComponent from "@/components/LoadingComponent";
import ProtectedRoute from "@/pages/ProtectedRoute";


const Form = lazy(() => import("@/pages/Form"));
const FormResponses = lazy(() => import("@/pages/FormResponses"));
const Login = lazy(() => import("@/pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
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
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
    </AuthProvider>
  )
}

export default App
