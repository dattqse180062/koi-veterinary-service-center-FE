import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "./hooks/context/AuthContext";
import AppointmentCustomerHistoryTable from './components/Customerpage/Appointment/AppointmentTable';

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DangNhapNguoiDung = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SecretPage = lazy(() => import("./pages/SecretPage"));
const ManagerPage = lazy(() => import("./pages/ManagerPage"));
const VeterinarianPage = lazy(() => import("./pages/VeterinarianPage"));

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <Navbar />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/register" element={<RegisterPage />} />

                            <Route path="/login" element={<DangNhapNguoiDung />} />
                            {/* For user */}
                            <Route path="/" element={<HomePage />} />
                            {/* For customer */}
                            <Route path="/my-appointment" element={<AppointmentCustomerHistoryTable />} />
                            <Route path="/secret" element={<SecretPage />} />
                            {/* Manager page */}
                            <Route path="/manager" element={<ManagerPage />} />
                            {/* Veterinarian page */}
                            <Route path="/veterinarian" element={<VeterinarianPage />} />

                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
