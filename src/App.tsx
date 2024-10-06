import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "./hooks/context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import AuthGuard from '../src/guards/AuthGuard';
import GuestGuard from '../src/guards/GuestGuard';
import RoleBasedGuard from '../src/guards/RoleBasedGuard';
import VetShiftSchePage from "./pages/VetShiftSchePage";
import ViewScheduleOfVetPage from "./pages/ViewScheduleOfVetPage";
import ServicePricingPage from "./pages/ServicePricingPage";
import TransportationPricingPage from "./pages/TransportationPricingPage";
import PasswordChangePage from "./pages/PasswordChangePage";
import KoiFishPage from "./pages/KoiFishPage";
import AddKoiFishPage from "./pages/AddKoiFishPage";
import AppointmentCustomerHistoryTable from './components/Customerpage/Appointment/AppointmentTable';


const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DangNhapNguoiDung = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SecretPage = lazy(() => import("./pages/SecretPage"));
const ManagerPage = lazy(() => import("./pages/ManagerPage"));

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <Navbar />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>

                            {/* Guest-only routes */}
                            <Route element={<GuestGuard />}>
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/login" element={<DangNhapNguoiDung />} />

                            </Route>

                            {/* Public routes */}
                            <Route path="/" element={<HomePage />} />


                            <Route path="/manager" element={<ManagerPage />} />

                            <Route path="/vetshift" element={<VetShiftSchePage />} />
                            <Route path="/vetsche" element={<ViewScheduleOfVetPage />} />

                            <Route path="/service-pricing" element={<ServicePricingPage />} />
                            <Route path="/transport-pricing" element={<TransportationPricingPage />} />
                            <Route path="/password-change" element={<PasswordChangePage />} />
                            <Route path="/settings" element={<ProfilePage />} />
                            <Route path="/koi" element={<KoiFishPage />} />
                            <Route path="/add-koifish" element={<AddKoiFishPage />} />
                            {/* Authenticated routes */}
                            <Route element={<AuthGuard />}>

                                {/* Role-based route */}
                                <Route element={<RoleBasedGuard allowedRoles={['admin']} />}>
                                    <Route path="/secret" element={<SecretPage />} />
                                </Route>
                            </Route>

                            <Route path="/register" element={<RegisterPage />} />

                            <Route path="/login" element={<DangNhapNguoiDung />} />
                            {/* For user */}
                            <Route path="/" element={<HomePage />} />

                            <Route path="/secret" element={<SecretPage />} />
                            {/* Manager page */}
                            <Route path="/manager" element={<ManagerPage />} />
                            {/* sửa dòng 24 thành page của manager, sửa cái path */}
                            <Route path="/my-appointment" element={<AppointmentCustomerHistoryTable />} />


                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
