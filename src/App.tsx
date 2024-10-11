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



// >>>>>>> feature/kvfs-140-veterinarian-manage-feedback-and-rating
import AppointmentCustomerHistoryTable from './components/Customerpage/Appointment/AppointmentTable';
import AppointmentHistoryTable from './components/Managerpage/Appointment/AppointmentHistoryTable';
import AppointmentDetailsPage from './components/Customerpage/Appointment/AppointmentDetailsPage';
import AppointmentHistoryDetailsPage from './components/Managerpage/Appointment/AppointmentDetailsPage';
import FeedbackDetailPage from './components/Veterinarianpage/FeedbackAndDetails/FeedbackDetailsPage';
import CustomerAccountTable from './components/Managerpage/Customer/CustomerTable';
import CustomerDetailPage from './components/Managerpage/Customer/CustomerDetailsPage';
import FeedbackTable from './components/Managerpage/FeebackAndRating/FeedbackTable';
import FeedbackDetailPageForManager from './components/Managerpage/FeebackAndRating/FeedbackDetailsForManager';


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
                            {/* Guest-only routes */}
                            <Route element={<GuestGuard />}>
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/login" element={<DangNhapNguoiDung />} />

                            </Route>

                            {/* Public routes */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/vetshift" element={<VetShiftSchePage />} />
                            <Route path="/vetsche" element={<ViewScheduleOfVetPage />} />
                            <Route path="/service-pricing" element={<ServicePricingPage/>} />
                            <Route path="/transport-pricing" element={<TransportationPricingPage/>} />

                            <Route path="/password-change" element={<PasswordChangePage/>} />
                            <Route path="/settings" element={<ProfilePage />} />
                            <Route path="/koi" element={<KoiFishPage />} />
                            <Route path="/add-koifish" element={<AddKoiFishPage />} />
                            {/* Authenticated routes */}
                            <Route element={<AuthGuard />}>


                            <Route path="/service-pricing" element={<ServicePricingPage />} />
                            <Route path="/transport-pricing" element={<TransportationPricingPage />} />
                            <Route path="/password-change" element={<PasswordChangePage />} />
                            <Route path="/settings" element={<ProfilePage />} />
                            <Route path="/koi" element={<KoiFishPage />} />
                            <Route path="/add-koifish" element={<AddKoiFishPage />} />

                                    {/* For customer */}
                            <Route path="/my-appointment" element={<AppointmentCustomerHistoryTable />} />
                            <Route path="/appointment/:id" element={<AppointmentDetailsPage />} /> {/* Đường dẫn cho trang chi tiết */}


                                    {/* Manager page */}
                            <Route path="/manager" element={<ManagerPage />} />

                                        {/* View staff details: manager */ }
                            <Route path="/feedback/:id" element={<FeedbackDetailPage />} /> {/* Trang chi tiết */ }

                                        {/* View appointment details: manager */ }
                            <Route path="/appointment" element={<AppointmentHistoryTable />} />
                            <Route path="/appointment-details" element={<AppointmentHistoryDetailsPage />} /> {/* Đường dẫn cho trang chi tiết */ }

                                        {/* View customer details page: manager */ }
                                        {/* NOTE: IN PROCESS , ĐANG CÓ NHIỀU TRỤC TRẶC 😭 */ }
                            <Route path="/customer" element={<CustomerAccountTable />} />
                            <Route path="/customer-details/:customerID" element={<CustomerDetailPage />} /> {/* Đường dẫn cho trang chi tiết */ }

                                        {/* View feedback details: manager */ }
                            <Route path="/feedback" element={<FeedbackTable />} />
                            <Route path="/feedback-details" element={<FeedbackDetailPageForManager />} /> {/* Đường dẫn cho trang chi tiết */ }

                                        {/* Veterinarian page */ }
                            <Route path="/veterinarian" element={<VeterinarianPage />} />

                                        {/* View feedback details: veterinarian */ }
                            {/* <Route path="/" element={<FeedbackTable />} /> */ }
                            <Route path="/feedback/:id" element={<FeedbackDetailPage />} /> {/* Trang chi tiết */ }



                                {/* Role-based route */}
                                <Route element={<RoleBasedGuard allowedRoles={['admin']} />}>
                                    <Route path="/secret" element={<SecretPage />} />
                                </Route>
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
