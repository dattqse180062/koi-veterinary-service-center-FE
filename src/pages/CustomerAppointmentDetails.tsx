import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getAppointmentDetails } from '../api/appointmentAPI';
import { createPayment, fetchPayment } from '../api/paymentApi';

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
    payment: PaymentDetails;
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
    const [PaymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    // const [isPaymentVisible, setIsPaymentVisible] = useState(false);
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

    // Kiểm tra điều kiện để hiển thị nút thanh toán
    // const isPaymentEnabled =  payment_method.VN_PAY && payment_status.NOT_PAID;

    const handleViewPaymentDetails = async () => {
        try {
            const paymentData = await fetchPayment(appointment_id);
            setPaymentDetails(paymentData);
            console.log(paymentData);
        } catch (error) {
            console.error('Error fetching payment details:', error);
        }
    };
    const handlePayment = async () => {
        try {
            const paymentUrl = await createPayment(appointment_id);
            window.open(paymentUrl, '_blank'); // Open payment URL in a new tab
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };



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
                            <p><strong>Service name:</strong> {appointment.service?.service_name}</p>
                            <p><strong>Service Price:</strong> {appointment.service?.service_price} VND</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Veterinarian Information</h5>
                            <p><strong>Name:</strong> {appointment.veterinarian?.first_name} {appointment.veterinarian?.last_name}</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Address Information</h5>
                            {appointment.address?.home_number }, {appointment.address?.ward }, {appointment.address?.district }, {appointment.address?.city }
                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Fish Information</h5>
                            <p><strong>Species:</strong> {appointment.fish?.species || 'NA'}</p>
                            <p><strong>Gender:</strong> {appointment.fish?.gender || 'NA'}</p>
                            <p><strong>Size:</strong> {appointment.fish?.size || 'NA'} cm </p>
                            <p><strong>Weight:</strong> {appointment.fish?.weight || 'NA'} kg</p>
                            <p><strong>Origin:</strong> {appointment.fish?.origin || 'NA'}</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Moving Surcharge</h5>
                            <p><strong>District:</strong> {appointment.moving_surcharge?.district || 'Not available' }</p>
                            <p><strong>Price:</strong> {appointment.moving_surcharge?.price || '0'} VND</p>

                            <h5 className="mt-3" style={{ fontWeight: '900' }}>- Total Price</h5>
                            <p><strong>Total:</strong> {appointment?.total_price || ''} VND</p>

                            <div ref={paymentRef} className="mt-3">
                                <h5 className="mt-3" style={{ fontWeight: '900' }}>- Payment Information</h5>
                                {/* test line 193: */}
                                <p><strong>Payment Method:</strong> {PaymentDetails?.payment_method || 'N/A'}</p>                     
                                <p><strong>Payment Amount:</strong> {appointment?.payment?.payment_amount || 'N/A'} VND</p>
                                <p><strong>Description:</strong> {appointment?.payment?.description || 'N/A'}</p>
                                <p><strong>Status:</strong> {appointment?.payment?.status || 'N/A'}</p>
                                <button className="btn btn-primary mt-3" onClick={handlePayment}>Pay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back</button>
            </div>



        </div>
    );
};

export default CustomerAppointmentDetails;
