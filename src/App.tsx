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
const ManagerStaffDetails = lazy(() => import("./pages/ManagerStaffDetailsPage"))
// Define a higher-order component with authentication
// const CustomerAppointment = lazy(() => import("./pages/CustomerAppointment"))
// const StaffAppointment = lazy(() => import("./pages/StaffAppointment"))

const DispatchAppointment = lazy(() => import("./pages/DispatchAppointment")) // NEW
const DispatchFeedback = lazy(() => import("./pages/DispatchFeedback")) // NEW

// For customer
// const MakeFeedback = lazy(() => import("./pages/MakeFeedback")) // NEW

//New: fix
const AddressManagementPage = lazy(() => import("./pages/AddressManagementPage"))
const AddressDetails = lazy(() => import("./pages/AddressDetails"))
const AddAddressPage = lazy(() => import("./pages/AddAddressPage"))

const StaffAppointment = lazy(() => import("./pages/StaffAppointment"))

const VetSchedulePage = lazy(() => import("./pages/VetSchedulePage"))

//NEW: FOR VETERINARIAN
const VeterinarianFeedbackDetailsPage = lazy(() => import("./pages/VeterinarianFeedbackDetailsPage"))
const VetAppointmentDetails = lazy(() => import("./pages/VetAppointmentDetails"))

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
                            <Route path="/profile" element={withAuth(ProfilePage)} />
                            <Route path="/password-change" element={withAuth(PasswordChangePage)} />

                            {/* Customer routes */}
                            <Route path="/koi/my-koi" element={withRole(KoiFishPage, ['CUS'])} />
                            <Route path="/koi/add" element={withRole(AddKoiFishPage, ['CUS'])} />
                            <Route path="/koi/details" element={withRole(KoiDetails, ['CUS'])} />
                            {/* <Route path="/my-appointment" element={withRole(CustomerAppointment, ['CUS'])} /> */}
                            <Route path="/appointment-details" element={withRole(CustomerAppointmentDetails, ['CUS'])} />
                            <Route path="/address/my-address" element={withRole(AddressManagementPage, ['CUS'])} />
                            <Route path="/address/details" element={withRole(AddressDetails, ['CUS'])} />
                            <Route path="/address/add" element={withRole(AddAddressPage, ['CUS'])} />


                            {/* Make appointment  */}
                            <Route path="/appointment/service-selection" element={withRole(ServiceSelectionPage, ['CUS'])} />
                            <Route path="/appointment/vet-selection" element={withRole(VeterinarianSelectionPage, ['CUS'])} />
                            <Route path="/appointment/slot-date-selection" element={withRole(SlotDateSelectionPage, ['CUS'])} />
                            <Route path="/appointment/fill-information" element={withRole(InformationPage, ['CUS'])} />
                            <Route path="/appointment/order-confirm" element={withRole(OrderConfirmPage, ['CUS'])} />

                            {/* Manager routes */}
                            <Route path="/manager/vet-list" element={withRole(VetShiftSchePage, ['MAN'])} />
                            <Route path="/manager/vet-details" element={withRole(VetDetails, ['MAN'])} />
                            <Route path="/manager/vet-schedule" element={withRole(ViewScheduleOfVetPage, ['MAN'])} />
                            <Route path="/manager/service-pricing" element={withRole(ServicePricingPage, ['MAN'])} />
                            <Route path="/manager/transport-pricing" element={withRole(TransportationPricingPage, ['MAN'])} />
                            <Route path="/manager/customer" element={withRole(CustomerManagementPage, ['MAN'])} />
                            <Route path="/manager/customer-details" element={withRole(CustomerDetailPage, ['MAN'])} />
                            <Route path="/manager/feedback" element={withRole(FeedbackManagementPage, ['MAN'])} />
                            <Route path="/manager/feedback-details" element={withRole(FeedbackDetail, ['MAN'])} />
                            <Route path="/manager/appointment-list" element={withRole(ManagerAppointment, ['MAN'])} />
                            <Route path="/manager/appointment-details" element={withRole(ManagerAppointmentDetails, ['MAN'])} />
                            <Route path="/manager/staff-list" element={withRole(ManagerStaffPage, ['MAN'])} />
                            <Route path="/manager/add-staff" element={withRole(AddStaffPage, ['MAN'])} />
                            <Route path="/manager/staff-details" element={withRole(ManagerStaffDetails, ['MAN'])} />

                            {/* Staff routes */}
                            <Route path="/staff/appointment-list" element={withRole(StaffAppointment, ['STA'])} />
                            {/*<Route path="/staff/appointment-details" element={withRole(StaffAppointmentDetails, ['STA'])} />*/}
                            <Route path="/staff/appointments/:appointment_id" element={withRole(StaffAppointmentDetails, ['STA'])} />

                            {/* Role: Veterinarian */}
                            <Route path="/veterinarian/vet-feedback-details" element={withRole(VeterinarianFeedbackDetailsPage, ['VET'])} />
                            <Route path="/veterinarian/schedule" element={withRole(VetSchedulePage, ['VET'])} />
                            <Route path="/veterinarian/appointment-details/:appointmentId" element={withRole(VetAppointmentDetails, ['VET'])} />


                        </Routes>

                    </Suspense>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
