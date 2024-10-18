import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getAppointmentDetails } from '../api/appointmentAPI';
import { fetchPayment } from '../api/paymentApi';

interface AppointmentDetailsProps {
    appointment_id: number;
    created_date: string;
    current_status: string;
    customer_name: string;
    email: string;
    phone_number: string;
    description: string;
    total_price: number;
    service: Service;
    moving_surcharge: movingSurcharge;
    address: Address;
    veterinarian: Veterinarian;
    fish: Fish;
}

interface Service {
    service_id: number;
    service_name: string;
    service_price: number;
}

interface movingSurcharge {
    moving_surcharge_id: number;
    district: string;
    price: number;
}

interface Address {
    address_id: number;
    city: string;
    district: string;
    ward: string;
    home_number: string;
    status: boolean;
}

interface Veterinarian {
    user_id: number;
    first_name: string;
    last_name: string;
}

interface Fish {
    fish_id: number;
    gender: string;
    age: number;
    species: string;
    size: number;
    weight: number;
    color: string;
    origin: string;
    enable: boolean;
}

interface PaymentDetails {
    payment_id: number;
    payment_method: payment_method;
    payment_amount: number;
    description: string;
    status: payment_status;
}

enum payment_method {
    CASH = 'CASH',
    VN_PAY = 'VN_PAY',
}

enum payment_status {
    NOT_PAID = 'NOT_PAID',
    PAID = 'PAID',
}

const CustomerAppointmentDetails: React.FC = () => {
    const location = useLocation();
    const appointment_id: number = location.state?.appointment_id;
    const [appointment, setAppointment] = useState<AppointmentDetailsProps | null>(null);
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const paymentRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    // Fetch appointment details by ID
    useEffect(() => {
        const fetchDetails = async () => {
            if (appointment_id) {
                try {
                    const appointmentData = await getAppointmentDetails(Number(appointment_id));
                    setAppointment(appointmentData);
                } catch (error) {
                    console.error('Error fetching appointment details:', error);
                }
            }
        };

        fetchDetails();
    }, [appointment_id]);

    // Function to handle view payment details
    const handleViewPaymentDetails = async () => {
        if (!isPaymentVisible) {
            try {
                const paymentData = await fetchPayment(appointment_id);
                setPaymentDetails(paymentData);

                if (paymentRef.current) {
                    paymentRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                console.error('Error fetching payment details:', error);
            }
        }
        setIsPaymentVisible(!isPaymentVisible);
    };

    if (!appointment) {
        return <div>Loading...</div>;
    }

    const formatDateTime = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleString('vi-VN', options);
    };

    const formattedDate = formatDateTime(appointment.created_date);

    return (
        <div className="container" style={{ marginTop: '2rem', textAlign: 'left' }}>
            <h2 className="mb-4" style={{ paddingTop: '65px' }}>Appointment Details</h2>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title" style={{ width: '100%' }}>
                        *Appointment ID: {appointment.appointment_id}
                    </h5>

                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Date:</strong> {formattedDate}</p>
                            <p><strong>Status:</strong> {appointment?.current_status}</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Customer Information</h5>
                            <p><strong>Name:</strong> {appointment?.customer_name}</p>
                            <p><strong>Email:</strong> {appointment?.email}</p>
                            <p><strong>Phone:</strong> {appointment?.phone_number}</p>
                            <p><strong>Description:</strong> {appointment?.description}</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Service Information</h5>
                            <p><strong>Service id:</strong> {appointment.service?.service_id}</p>
                            <p><strong>Service name:</strong> {appointment.service?.service_name}</p>
                            <p><strong>Service Price:</strong> {appointment.service?.service_price} USD</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Veterinarian Information</h5>
                            <p><strong>Name:</strong> {appointment.veterinarian?.first_name} {appointment.veterinarian?.last_name}</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Address Information</h5>
                            {appointment.address?.home_number || 'Not available'}, {appointment.address?.ward || 'Not available'}, {appointment.address?.district || 'Not available'}, {appointment.address?.city || 'Not available'}
                        </div>

                        <div className="col-md-6">
                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Fish Information</h5>
                            <p><strong>Species:</strong> {appointment.fish?.species}</p>
                            <p><strong>Gender:</strong> {appointment.fish?.gender}</p>
                            <p><strong>Size:</strong> {appointment.fish?.size} cm</p>
                            <p><strong>Weight:</strong> {appointment.fish?.weight} kg</p>
                            <p><strong>Origin:</strong> {appointment.fish?.origin}</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Moving Surcharge</h5>
                            <p><strong>District:</strong> {appointment.moving_surcharge?.district || 'Not available'}</p>
                            <p><strong>Price:</strong> {appointment.moving_surcharge?.price || '0'} USD</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Total Price</h5>
                            <p><strong>Total:</strong> {appointment?.total_price || ''} USD</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back</button>

                <button className="btn btn-primary mt-3" style={{ marginLeft: '10px' }} onClick={handleViewPaymentDetails}>
                    View Payment Details
                </button>
            </div>

            {isPaymentVisible && paymentDetails && (
                <div className="card mt-4" ref={paymentRef}>
                    <div className="card-body">
                        <h5 className="card-title">Payment Details</h5>
                        <p><strong>Payment ID:</strong> {paymentDetails.payment_id}</p>
                        <p><strong>Payment method:</strong> {paymentDetails.payment_method}</p>
                        <p><strong>Payment amount:</strong> {paymentDetails.payment_amount} USD</p>
                        <p><strong>Status:</strong> {paymentDetails.status || 'Unknown'}</p>
                        <p><strong>Description:</strong> {paymentDetails.description || 'N/A'}</p>
                    </div>
                </div>
            )}


            {/* ASSIGN BÁC SĨ */}

            
            
            {/* CONFIRM */}
        
        
        </div>
    );
};

export default CustomerAppointmentDetails;
