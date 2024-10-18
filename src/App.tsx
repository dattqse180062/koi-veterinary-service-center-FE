import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "./hooks/context/AuthContext";
import AuthGuard from '../src/guards/AuthGuard';
import GuestGuard from '../src/guards/GuestGuard';
import RoleBasedGuard from '../src/guards/RoleBasedGuard';
import UnauthorizedPage from "./pages/UnauthorizedPage";


import AppointmentHistoryTable from './components/Managerpage/Appointment/AppointmentHistoryTable';
import AppointmentHistoryDetailsPage from './components/Managerpage/Appointment/AppointmentDetailsPage';
import FeedbackDetailPage from './components/Veterinarianpage/FeedbackAndDetails/FeedbackDetailsPage';
import FeedbackDetailPageForManager from './components/Managerpage/FeebackAndRating/FeedbackDetailsForManager';


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
const SecretPage = lazy(() => import("./pages/SecretPage"));
const ManagerPage = lazy(() => import("./pages/ManagerPage"));
const VeterinarianPage = lazy(() => import("./pages/VeterinarianPage"));
const VetDetails = lazy(() => import("./pages/VetDetails"));

// NEW
const CustomerManagementPage = lazy(() => import("./pages/CustomerManagementPage"))
const CustomerDetailPage = lazy(() => import("./pages/CustomerDetails"))
const FeedbackManagementPage = lazy(() => import("./pages/FeedbackManagementPage"))
const FeedbackDetail = lazy(() => import("./pages/FeedbackDetails"))
const StaffAppointment = lazy(() => import("./pages/StaffAppointment"))
const StaffAppointmentDetails = lazy(() => import("./pages/StaffAppointmentDetails"))
const ManagerAppointment = lazy(() => import("./pages/ManagerAppointment"))
// const FeedbackDetailPageForManager = lazy(() => import("./pages/FeebackDetails"))

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <Navbar />
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

                            {/* Staff routes */}
                            <Route
                                path="/my-appointment"
                                element={
                                    <AuthGuard >
                                        <StaffAppointment />
                                    </AuthGuard>
                                }
                            />

                            <Route
                                path="/my-appointment-details"
                                element={
                                    <AuthGuard >
                                        <StaffAppointmentDetails />
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
                                path="/vet-details"
                                element={
                                    <RoleBasedGuard allowedRoles={['MAN']}>
                                        <VetDetails />
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
                                path="/manager"
                                element={
                                    <RoleBasedGuard allowedRoles={['MAN']}>
                                        <ManagerPage />
                                    </RoleBasedGuard>
                                }
                            />

                            <Route
                                path="/customer"
                                element={
                                    <RoleBasedGuard allowedRoles={['MAN']}>
                                        <CustomerManagementPage />
                                    </RoleBasedGuard>
                                }
                            />

                            <Route
                                path="/customer-details"
                                element={
                                    <RoleBasedGuard allowedRoles={['MAN']}>
                                        <CustomerDetailPage />
                                    </RoleBasedGuard>
                                }
                            />

                            <Route
                                path="/feedback"
                                element={
                                    <RoleBasedGuard allowedRoles={['MAN']}>
                                        <FeedbackManagementPage />
                                    </RoleBasedGuard>
                                }
                            />

                            <Route
                                path="/feedback-details"
                                element={
                                    <RoleBasedGuard allowedRoles={['MAN']}>
                                        <FeedbackDetail />
                                    </RoleBasedGuard>
                                }
                            />

                            <Route
                                path="/history"
                                element={
                                    <RoleBasedGuard allowedRoles={['MAN']}>
                                        <ManagerAppointment />
                                    </RoleBasedGuard>
                                }
                            />




                            {/* Role: Veterinarian */}
                            <Route
                                path="/veterinarian"
                                element={
                                    <RoleBasedGuard allowedRoles={['VET']}>
                                        <VeterinarianPage />
                                    </RoleBasedGuard>
                                }
                            />


                            {/* <Route
                                path="/feedback/:id"
                                element={
                                    <RoleBasedGuard allowedRoles={['VET']}>
                                        <FeedbackDetailPage />
                                    </RoleBasedGuard>
                                }
                            /> */}

                            {/* <Route
                                path="/feedback/:id"
                                element={
                                    <RoleBasedGuard allowedRoles={['MAN']}>
                                        <FeedbackDetailPage />
                                    </RoleBasedGuard>
                                }
                            /> */}

                            <Route
                                path="/appointment"
                                element={
                                    <RoleBasedGuard allowedRoles={['MAN']}>
                                        <AppointmentHistoryTable />
                                    </RoleBasedGuard>
                                }
                            />

                            <Route
                                path="/appointment-details"
                                element={
                                    <RoleBasedGuard allowedRoles={['MAN']}>
                                        <AppointmentHistoryDetailsPage />
                                    </RoleBasedGuard>
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
