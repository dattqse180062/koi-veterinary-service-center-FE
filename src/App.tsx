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


import AppointmentHistoryTable from './components/Managerpage/Appointment/AppointmentHistoryTable';
import AppointmentHistoryDetailsPage from './components/Managerpage/Appointment/AppointmentDetailsPage';
import FeedbackDetailPage from './components/Veterinarianpage/FeedbackAndDetails/FeedbackDetailsPage';
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


// NEW
const CustomerManagementPage = lazy(() => import("./pages/CustomerManagementPage"))
const CustomerDetailPage = lazy(() => import("./pages/CustomerDetails"))
const FeedbackManagementPage = lazy(() => import("./pages/FeedbackManagementPage"))
const FeedbackDetail = lazy(() => import("./pages/FeedbackDetails"))
const StaffAppointment = lazy(() => import("./pages/StaffAppointment"))
const StaffAppointmentDetails = lazy(() => import("./pages/StaffAppointmentDetails"))
const ManagerAppointment = lazy(() => import("./pages/ManagerAppointment"))


// Define a higher-order component with authentication
const withAuth = (Component: React.ComponentType) => (
    <AuthGuard>
        <Component />
    </AuthGuard>
);

// Define a higher-order component with role-based authentication
const withRole = (Component: React.ComponentType, allowedRoles: string[]) => (
    <AuthGuard>
        <RoleBasedGuard allowedRoles={allowedRoles}>
            <Component />
        </RoleBasedGuard>
    </AuthGuard>
);


function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <Navbar />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/login" element={<DangNhapNguoiDung />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/no-access" element={<UnauthorizedPage />} />

                            {/* Authenticated routes */}
                            <Route path="/settings" element={withAuth(ProfilePage)} />
                            <Route path="/password-change" element={withAuth(PasswordChangePage)} />

                            {/* Customer routes */}
                            <Route path="/koi" element={withRole(KoiFishPage, ['CUS'])} />
                            <Route path="/add-koifish" element={withRole(AddKoiFishPage, ['CUS'])} />
                            <Route path="/koi-details" element={withRole(KoiDetails, ['CUS'])} />

                            <Route path="/addresses" element={withRole(AddressManagementPage, ['CUS'])} />
                            <Route path="/address-details" element={withRole(AddressDetails, ['CUS'])} />
                            <Route path="/add-address" element={withRole(AddAddressPage, ['CUS'])} />
                            {/* Make appointment  */}
                            <Route path="/appointment/service-selection" element={withRole(ServiceSelectionPage, ['CUS'])} />
                            <Route path="/appointment/vet-selection" element={withRole(VeterinarianSelectionPage, ['CUS'])} />
                            <Route path="/appointment/slot-date-selection" element={withRole(SlotDateSelectionPage, ['CUS'])} />
                            <Route path="/appointment/fill-information" element={withRole(InformationPage, ['CUS'])} />
                            <Route path="/appointment/order-confirm" element={withRole(OrderConfirmPage, ['CUS'])} />

                            {/* Manager routes */}
                            <Route path="/vetshift" element={withRole(VetShiftSchePage, ['MAN'])} />
                            <Route path="/vet-details" element={withRole(VetDetails, ['MAN'])} />
                            <Route path="/vetsche" element={withRole(ViewScheduleOfVetPage, ['MAN'])} />
                            <Route path="/service-pricing" element={withRole(ServicePricingPage, ['MAN'])} />
                            <Route path="/transport-pricing" element={withRole(TransportationPricingPage, ['MAN'])} />
                            <Route path="/customer" element={withRole(CustomerManagementPage, ['MAN'])} />
                            <Route path="/customer-details" element={withRole(CustomerDetailPage, ['MAN'])} />
                            <Route path="/feedback" element={withRole(FeedbackManagementPage, ['MAN'])} />
                            <Route path="/feedback-details" element={withRole(FeedbackDetail, ['MAN'])} />
                            <Route path="/history" element={withRole(ManagerAppointment, ['MAN'])} />
                            <Route path="/appointment" element={withRole(AppointmentHistoryTable, ['MAN'])} />
                            <Route path="/appointment-details" element={withRole(AppointmentHistoryDetailsPage, ['MAN'])} />

                            {/* Staff routes */}
                            <Route path="/my-appointment" element={withRole(StaffAppointment, ['STA'])} />
                            <Route path="/my-appointment-details" element={withRole(StaffAppointmentDetails, ['STA'])} />


                            {/* Role: Veterinarian */}
                            <Route path="/veterinarian-schedule" element={withRole(VetSchedulePage, ['VET'])} />
                            <Route path="/appointment-details/:appointmentId/veterinarian" element={withRole(VetAppointmentDetails, ['VET'])} />

                        </Routes>

                    </Suspense>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
