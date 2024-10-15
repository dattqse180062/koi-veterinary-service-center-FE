import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "./hooks/context/AuthContext";
import AuthGuard from '../src/guards/AuthGuard';
import GuestGuard from '../src/guards/GuestGuard';
import RoleBasedGuard from '../src/guards/RoleBasedGuard';
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ServiceSelectionPage from "./pages/Appointment/ServiceSelectionPage";
import VeterinarianSelectionPage from "./pages/Appointment/VeterinarianSelectionPage";
import SlotDateSelectionPage from "./pages/Appointment/SlotDateSelectionPage";
import InformationPage from "./pages/Appointment/InformationPage";
import OrderConfirmPage from "./pages/Appointment/OrderConfirmPage";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DangNhapNguoiDung = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PasswordChangePage = lazy(() => import("./pages/PasswordChangePage"));
const KoiFishPage = lazy(() => import("./pages/KoiFishPage"));
const AddKoiFishPage = lazy(() => import("./pages/AddKoiFishPage"));
const KoiDetails = lazy(() => import("./pages/KoiFishDetails"));
const VetShiftSchePage = lazy(() => import("./pages/VetShiftSchePage"));
const ViewScheduleOfVetPage = lazy(() => import("./pages/ViewScheduleOfVetPage"));
const ServicePricingPage = lazy(() => import("./pages/ServicePricingPage"));
const TransportationPricingPage = lazy(() => import("./pages/TransportationPricingPage"));

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <Navbar/>
                    <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {/* Tất cả người dùng */}
                        <Route path="/login" element={<DangNhapNguoiDung />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route
                            path="/settings"
                            element={
                                <AuthGuard>
                                    <ProfilePage />
                                </AuthGuard>
                            }
                        />
                        <Route
                            path="/password-change"
                            element={
                                <AuthGuard>
                                    <PasswordChangePage />
                                </AuthGuard>
                            }
                        />

                        {/* Customer routes */}
                        <Route
                            path="/koi"
                            element={
                                <RoleBasedGuard allowedRoles={['CUS']}>
                                    <KoiFishPage />
                                </RoleBasedGuard>
                            }
                        />
                        <Route
                            path="/add-koifish"
                            element={
                                <RoleBasedGuard allowedRoles={['CUS']}>
                                    <AddKoiFishPage />
                                </RoleBasedGuard>
                            }
                        />
                        <Route
                            path="/koi-details"
                            element={
                                <RoleBasedGuard allowedRoles={['CUS']}>
                                    <KoiDetails />
                                </RoleBasedGuard>
                            }
                        />

                        {/* Manager routes */}
                        <Route
                            path="/vetshift"
                            element={
                                <RoleBasedGuard allowedRoles={['MAN']}>
                                    <VetShiftSchePage />
                                </RoleBasedGuard>
                            }
                        />
                        <Route
                            path="/vetsche"
                            element={
                                <RoleBasedGuard allowedRoles={['MAN']}>
                                    <ViewScheduleOfVetPage />
                                </RoleBasedGuard>
                            }
                        />
                        <Route
                            path="/service-pricing"
                            element={
                                <RoleBasedGuard allowedRoles={['MAN']}>
                                    <ServicePricingPage />
                                </RoleBasedGuard>
                            }
                        />
                        <Route
                            path="/transport-pricing"
                            element={
                                <RoleBasedGuard allowedRoles={['MAN']}>
                                    <TransportationPricingPage />
                                </RoleBasedGuard>
                            }
                        />

                        <Route
                            path="/appointment/service-selection"
                            element={
                                <AuthGuard>
                                    <ServiceSelectionPage />
                                </AuthGuard>
                            }
                        />
                        <Route
                            path="/appointment/vet-selection"
                            element={
                                <AuthGuard>
                                    <VeterinarianSelectionPage />
                                </AuthGuard>
                            }
                        />

                        <Route
                            path="/appointment/slot-date-selection"
                            element={
                                <AuthGuard>
                                    <SlotDateSelectionPage />
                                </AuthGuard>
                            }
                        />

                        <Route
                            path="/appointment/fill-information"
                            element={
                                <AuthGuard>
                                    <InformationPage />
                                </AuthGuard>
                            }
                        />

                        <Route
                            path="/appointment/order-confirm"
                            element={
                                <AuthGuard>
                                    <OrderConfirmPage />
                                </AuthGuard>
                            }
                        />

                        {/* Trang chủ */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/no-access" element={<UnauthorizedPage />} />
                    </Routes>
                    </Suspense>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
