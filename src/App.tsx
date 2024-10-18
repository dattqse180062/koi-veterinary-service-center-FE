import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "./hooks/context/AuthContext";
import AuthGuard from '../src/guards/AuthGuard';
import GuestGuard from '../src/guards/GuestGuard';
import RoleBasedGuard from '../src/guards/RoleBasedGuard';
import UnauthorizedPage from "./pages/UnauthorizedPage";





import AppointmentCustomerHistoryTable from './components/Customerpage/Appointment/AppointmentTable';
import AppointmentHistoryTable from './components/Managerpage/Appointment/AppointmentHistoryTable';
import AppointmentDetailsPage from './components/Customerpage/Appointment/AppointmentDetailsPage';
import AppointmentHistoryDetailsPage from './components/Managerpage/Appointment/AppointmentDetailsPage';
import FeedbackDetailPage from './components/Veterinarianpage/FeedbackAndDetails/FeedbackDetailsPage';
import CustomerAccountTable from './components/Managerpage/Customer/CustomerTable';
import CustomerDetailPage from './components/Managerpage/Customer/CustomerDetailsPage';
import FeedbackTable from './components/Managerpage/FeebackAndRating/FeedbackTable';
import FeedbackDetailPageForManager from './components/Managerpage/FeebackAndRating/FeedbackDetailsForManager';
import AddressManagementPage from "./pages/AddressManagementPage";
import AddressDetails from "./pages/AddressDetails";
import AddAddressPage from "./pages/AddAddressPage";
import VetSchedulePage from "./pages/VetSchedulePage";
import VetAppointmentDetails from "./pages/VetAppointmentDetails";


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

                        <Route
                            path="/addresses"
                            element={
                                <RoleBasedGuard allowedRoles={['CUS']}>
                                    <AddressManagementPage />
                                </RoleBasedGuard>
                            }
                        />
                        <Route
                            path="/address-details"
                            element={
                                <RoleBasedGuard allowedRoles={['CUS']}>
                                    <AddressDetails />
                                </RoleBasedGuard>
                            }
                        />

                        <Route
                            path="/add-address"
                            element={
                                <RoleBasedGuard allowedRoles={['CUS']}>
                                    <AddAddressPage />
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
                            path="/veterinarian-schedule"
                            element={
                                <RoleBasedGuard allowedRoles={['VET']}>
                                    <VetSchedulePage />
                                </RoleBasedGuard>
                            }
                        />

                        <Route
                            path="/appointment-details/:appointmentId/veterinarian"
                            element={
                                <RoleBasedGuard allowedRoles={['VET']}>
                                    <VetAppointmentDetails />
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
                                    <CustomerAccountTable />
                                </RoleBasedGuard>
                            }
                        />

                        <Route
                            path="/customer-details/:customerID"
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
                                    <FeedbackTable />
                                </RoleBasedGuard>
                            }
                        />

                        <Route
                            path="/feedback-details"
                            element={
                                <RoleBasedGuard allowedRoles={['MAN']}>
                                    <FeedbackDetailPageForManager />
                                </RoleBasedGuard>
                            }
                        />

                        <Route
                            path="/veterinarian"
                            element={
                                <RoleBasedGuard allowedRoles={['VET']}>
                                    <VeterinarianPage />
                                </RoleBasedGuard>
                            }
                        />


                        <Route
                            path="/feedback/:id"
                            element={
                                <RoleBasedGuard allowedRoles={['VET']}>
                                    <FeedbackDetailPage />
                                </RoleBasedGuard>
                            }
                        />

                        <Route
                            path="/feedback/:id"
                            element={
                                <RoleBasedGuard allowedRoles={['MAN']}>
                                    <FeedbackDetailPage />
                                </RoleBasedGuard>
                            }
                        />

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



                        <Route
                            path="/my-appointment"
                            element={
                                <RoleBasedGuard allowedRoles={['CUS']}>
                                    <AppointmentCustomerHistoryTable />
                                </RoleBasedGuard>
                            }
                        />

                        <Route
                            path="/appointment/:id"
                            element={
                                <RoleBasedGuard allowedRoles={['CUS']}>
                                    <AppointmentDetailsPage  />
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
