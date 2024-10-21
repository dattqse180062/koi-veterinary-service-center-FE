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

// Lazy load pages
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


const VetDetails = lazy(() => import("./pages/VetDetails"));


// NEW
const CustomerManagementPage = lazy(() => import("./pages/CustomerManagementPage"))
const CustomerDetailPage = lazy(() => import("./pages/CustomerDetails"))
const FeedbackManagementPage = lazy(() => import("./pages/FeedbackManagementPage"))
const FeedbackDetail = lazy(() => import("./pages/FeedbackDetailsManagerPage"))
const StaffAppointmentDetails = lazy(() => import("./pages/StaffAppointmentDetails"))
const ManagerAppointment = lazy(() => import("./pages/ManagerAppointment"))
const ManagerAppointmentDetails = lazy(() => import("./pages/ManagerAppointmentDetails"))
const CustomerAppointmentDetails = lazy(() => import("./pages/CustomerAppointmentDetails"))
const ManagerStaffPage = lazy(() => import("./pages/ManagerStaffPage"))
const AddStaffPage = lazy(() => import("./pages/AddStaffPage"))
// Define a higher-order component with authentication
// const CustomerAppointment = lazy(() => import("./pages/CustomerAppointment"))
// const StaffAppointment = lazy(() => import("./pages/StaffAppointment"))

const DispatchAppointment = lazy(() => import("./pages/DispatchAppointment")) // NEW
const DispatchFeedback = lazy(() => import("./pages/DispatchFeedback")) // NEW

// For customer
// const MakeFeedback = lazy(() => import("./pages/MakeFeedback")) // NEW


//NEW: FOR VETERINARIAN
const VeterinarianFeedbackDetailsPage = lazy(() => import("./pages/VeterinarianFeedbackDetailsPage"))

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

                            {/* Shared appointment route for different roles: STA, CUS */}
                            <Route path="/my-appointment" element={withAuth(DispatchAppointment)} />

                            {/* Shared feedback route for different roles: VET, MAN */}
                            <Route path="/feedback" element={withAuth(DispatchFeedback)} />

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
                            {/* <Route path="/my-appointment" element={withRole(CustomerAppointment, ['CUS'])} /> */}
                            <Route path="/my-appointment-details-customer" element={withRole(CustomerAppointmentDetails, ['CUS'])} />
                            
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
                            <Route path="/appointment" element={withRole(ManagerAppointment, ['MAN'])} />
                            <Route path="/appointment-details" element={withRole(ManagerAppointmentDetails, ['MAN'])} />
                            <Route path="/staff" element={withRole(ManagerStaffPage, ['MAN'])} />
                            <Route path="/add-staff" element={withRole(AddStaffPage, ['MAN'])} />


                            {/* Staff routes */}
                            <Route path="/my-appointment-details" element={withRole(StaffAppointmentDetails, ['STA'])} />

                            {/* Role: Veterinarian */}
                            <Route path="/vet-feedback-details" element={withRole(VeterinarianFeedbackDetailsPage, ['VET'])} />

                        </Routes>

                    </Suspense>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
